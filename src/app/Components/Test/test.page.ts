
import { TestService } from './../../../Service/test.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-test',
  templateUrl: 'test.page.html',
  styleUrls: ['test.page.scss'],
})
export class TestPage implements OnInit {
  constructor(
    private TestService: TestService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private sanitizer: DomSanitizer
  ) {}

  isLoading: boolean = true;
  icerik: string = '';
  baslik: string = '';
  resim: string = '';
  sonuclar: any[] = [];
  selectedsorular: any[] = [];
  selectedvalues: any[] = [];
  serverpath: any = 'https://api.therapydays.com/static';

  stripHtmlTags(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.TestService.getTest(parseInt(id, 10)).subscribe({
        next: (result: any) => {
          console.log(result);
          this.icerik = result.icerik;
          this.baslik = result.baslik;
          this.resim = result.resim;
          this.sonuclar = result.sonuclar;
          this.selectedsorular = result.sorular;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  onSubmit() {
    // Toplam puanı hesapla
    const toplamPuan = this.selectedvalues.reduce(
      (acc, value) => acc + value,
      0
    );

    console.log(this.sonuclar);

    // Her sonucun puanı ile kontrol et
    const uygunSonuc = this.sonuclar.find(sonuc => toplamPuan <= sonuc.puan);
    console.log(uygunSonuc);
    console.log(toplamPuan);

    if (uygunSonuc) {
      // this.presentAlert(uygunSonuc.baslik);
      this.presentAlert("Test sonuçlarınızı değerlendirdik, size uygun en iyi psikologlarımıza yönlendiriyoruz.", uygunSonuc);
    } else {
      this.presentAlert('Bir sorun yok gibi görünüyor.', uygunSonuc);
    }
  }

  async presentAlert(message: string, uygunSonuc: any = null) {
    const alert = await this.alertController.create({
      header: this.baslik + ' Testi',
      message: message,
      buttons: [{
        text: 'Anladım',
        handler: () => {
          this.isLoading = !this.isLoading;
          setTimeout(() => {
            this.isLoading = !this.isLoading;
            const navigationExtras: NavigationExtras = {
              state: {
                puan: uygunSonuc ? true : false,
              },
            };
            this.router.navigate([`/tabs/psikologlar/`], navigationExtras);
          }, 2000);
        }
      }],

    });

    await alert.present();
  }
}
