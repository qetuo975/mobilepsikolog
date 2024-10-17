
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

    if (toplamPuan > this.sonuclar[0].puan) {
      this.presentAlert('Bir Sorun Var Gibi Görünüyor.');

    } else {
      this.presentAlert('Bir Sorun Yok Gibi Görünüyor.');
    }

    setTimeout(() => {
      const navigationExtras: NavigationExtras = {
        state: {
          puan: true,
        },
      };
      this.router.navigate([`/tabs/psikologlar/`], navigationExtras);
    }, 3000)

  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: this.baslik + ' Testi',
      message: message,
      buttons: ['Anladım'],
    });

    await alert.present();
  }
}
