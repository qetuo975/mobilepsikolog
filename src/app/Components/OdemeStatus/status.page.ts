import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/Service/user.service';

@Component({
  selector: 'app-status',
  templateUrl: 'status.page.html',
  styleUrls: ['status.page.scss'],
})
export class StatusPage implements OnInit, OnDestroy {
  paymentStatus: string | null = null; // Ödeme durumunu saklamak için değişken
  message: string = ''; // Kullanıcıya gösterilecek mesaj
  psikologId!: number;
  start!: string;
  end!: string;
  tarih!: string;
  free: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastController: ToastController
  ) {}

  ngOnDestroy(): void {
    localStorage.removeItem('psikologId');
    localStorage.removeItem('start');
    localStorage.removeItem('end');
    localStorage.removeItem('tarih');
    localStorage.removeItem('free');
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }


  ngOnInit(): void {
    // URL'den "status" parametresini al
    this.route.queryParams.subscribe((params) => {
      this.paymentStatus = params['status'] || null; // "status" parametresi "ok" veya "false" olabilir
      this.handlePaymentStatus();
      this.autoRedirect(); // 5 saniye sonra ana sayfaya yönlendir
    });
  }

  addSeans() {
    this.userService
      .PsikologSeans(
        Number(localStorage.getItem('id')),
        Number(localStorage.getItem('psikologId')),
        {
          tarih: String(localStorage.getItem('tarih')),
          start: String(localStorage.getItem('start')),
          end: String(localStorage.getItem('end')),
        },
        Boolean(true ? String(localStorage.getItem('free')) : false)
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

  // Duruma göre mesaj ayarla
  handlePaymentStatus(): void {
    if (this.paymentStatus === 'ok') {
      this.message = 'Ödemeniz başarıyla tamamlandı. Teşekkür ederiz!';
      this.addSeans();
    } else if (this.paymentStatus === 'false') {
      this.message = 'Ödemeniz başarısız oldu. Lütfen tekrar deneyiniz.';
    } else {
      this.message = 'Ödeme durumu doğrulanamadı.';
    }
  }

  // 5 saniye sonra ana sayfaya yönlendirme
  autoRedirect(): void {
    setTimeout(() => {
      this.router.navigate(['/']); // Ana sayfaya yönlendirme
    }, 5000);
  }
}
