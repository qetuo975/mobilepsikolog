
import { TestService } from './../../../Service/test.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-test',
  templateUrl: 'test.page.html',
  styleUrls: ['test.page.scss'],
})
export class TestPage implements OnInit {
  constructor(
    private TestService: TestService,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  icerik: string = '';
  baslik: string = '';
  sonuclar: any[] = [];
  selectedsorular: any[] = [];
  selectedvalues: any[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.TestService.getTest(parseInt(id, 10)).subscribe({
        next: (result: any) => {
          console.log(result);
          this.icerik = result.icerik;
          this.baslik = result.baslik;
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

    // Son geçilen puanı ve başlığı tutacak değişkenler
    let sonGecenPuan = 0;
    let sonGecenBaslik = '';

    // Verileri kontrol et
    for (let i = 0; i < this.sonuclar.length; i++) {
      if (toplamPuan > this.sonuclar[i].puan) {
        sonGecenPuan = this.sonuclar[i].puan;
        sonGecenBaslik = this.sonuclar[i].baslik;
      }
    }

    // Sonucu yazdır
    if (sonGecenBaslik !== '') {
      console.log(sonGecenBaslik);
      this.presentAlert(sonGecenBaslik);
    } else {
      console.log('Yeterli veri yok');
      this.presentAlert('Yeterli veri yok');
    }
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
