import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/Service/user.service';

@Component({
  selector: 'app-verifty',
  templateUrl: 'pay.page.html',
  styleUrls: ['pay.page.scss'],
})
export class PayPage implements OnInit, AfterViewInit  {
  psikologId!: number;
  free: boolean = false;
  start!: string;
  end!: string;
  tarih!: string;
  email!: string;
  telefon!: string;
  adsoyad!: string;
  adres!: string;
  fiyat!: number;
  tokenUrl!: SafeResourceUrl;
  iframeLoaded: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer // DomSanitizer'ı ekleyin

  ) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    const state: any = this.router.getCurrentNavigation()?.extras.state;
    this.psikologId = state.data.psikologId;
    this.free = state.data.free;
    this.start = state.data.start;
    this.end = state.data.end;
    this.tarih = state.data.tarih;

    this.userService.getUser(Number(localStorage.getItem('id'))).subscribe({
      next: (res) => {
        console.log(res);
        this.telefon = res.telefon;
        this.email = res.email;
        this.adsoyad = res.adsoyad;
        this.adres = res.adres;

        this.userService.getPsikolog(this.psikologId).subscribe({
          next: (value) => {
            this.fiyat = value.fiyat;

            if (!this.free)
            {
              localStorage.setItem('psikologId', String(this.psikologId));
              localStorage.setItem('free', this.free ? '1' : '0');
              localStorage.setItem('start', this.start);
              localStorage.setItem('end', this.end);
              localStorage.setItem('tarih', this.tarih);

              this.pay();
            } else {
              this.addSeans();
              setTimeout(() => {
                this.router.navigate(['/']);
              })
            }

            console.log(value);
          },
          error: (err) => {
            console.error(err);
          }
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  addSeans() {
    this.userService
      .PsikologSeans(
        Number(localStorage.getItem('id')),
        this.psikologId,
        {
          tarih: this.tarih,
          start: this.start,
          end: this.end,
        },
        this.free
      )
      .subscribe({
        next: (result: any) => {
          if (result.result == true) {
            this.presentToast('top', result.seans.tarih + ' Seans Alınmıştır.');
          } else {
            this.presentToast('top', 'Seans alma başarısız.');
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  onIframeLoad() {
    this.iframeLoaded = true;
    const iframeElement = document.getElementById('paytriframe');
    if (iframeElement) {
      iframeElement.style.display = 'block'; // Iframe’i göster
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  pay() {
    const paymentData = {
      basket: [
        ['Terapi Hizmeti', this.fiyat * 100, 1],
      ],
      email: this.email,
      payment_amount: this.fiyat * 100, // Ödeme tutarı (örneğin: 100.00 TL için 10000)
      user_name: this.adsoyad,
      user_address: this.adres, // Buraya gerçek adres eklenebilir
      user_phone: this.telefon // Gerçek telefon numarası eklenebilir
    };
    this.userService.payment(paymentData).subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response);
          this.tokenUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.paytr.com/odeme/guvenli/${response.token}`);

        } else {
          this.presentToast('top', 'Token Başarısız');
        }
      },
      error: (err) => {
        console.error('Ödeme sırasında bir hata oluştu:', err);
        this.presentToast('top', 'Ödeme sırasında bir hata oluştu.');
      },
    });
  }



}
