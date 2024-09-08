import { UserService } from './../../../Service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-psikologhesabi',
  templateUrl: 'psikologhesabi.page.html',
  styleUrls: ['psikologhesabi.page.scss'],
})
export class PsikologHesabiPage implements OnInit {
  @ViewChild('UserSeansModal', { static: false }) UserSeansModal!: IonModal;
  serverpath: string = 'https://bahrikement.com/static';

  psikolog: any;
  psikologseanslar: any;
  selectedSeans: any;
  type: any;
  selectedTime: any;
  odaid: any;
  accountblock: any;
  freeaccount: boolean = false;

  constructor(
    private UserService: UserService,
    private route: ActivatedRoute,
    private ToastController: ToastController,
    private Router: Router
  ) {}

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.ToastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  selectSeans(seans: any) {
    this.selectedSeans = seans;
    if (this.selectedSeans.dolu == true) {
      this.presentToast(
        'top',
        'Seans dolu, lütfen başka tarihte seans seçiniz.'
      );
      this.selectedSeans = null;
    }
  }

  seansAdd() {
    this.UserService.PsikologSeans(
      Number(localStorage.getItem('id')),
      this.psikolog.id,
      {
        tarih: this.selectedSeans.tarih,
        start: this.selectedSeans.baslangicsaat,
        end: this.selectedSeans.bitissaat,
      },
      this.freeaccount
    ).subscribe({
      next: (result: any) => {
        if (result.result == true) {
          this.presentToast('top', result.seans.tarih + ' Seans Alınmıştır.');
          this.getPsikologSeanslar();
        } else {
          this.presentToast('top', 'Seans alma başarısız.');
        }
        console.log(result);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  freeseansAdd() {
    this.UserService.FreePsikologSeans(
      Number(localStorage.getItem('id')),
      this.psikolog.id,
      {
        tarih: this.selectedSeans.tarih,
        start: this.selectedSeans.baslangicsaat,
        end: this.selectedSeans.bitissaat,
      },
      this.odaid
    ).subscribe({
      next: (result: any) => {
        console.log(result);
        if (result.randevu) {
          this.presentToast('top', 'Seans Alınmıştır.');
          this.getPsikologSeanslar();
        } else {
          this.presentToast('top', 'Seans alma başarısız.');
        }
        console.log(result);
      },
      error: (err: any) => {
        if (
          err.error.message == 'Haftalık randevu kotası doldu' ||
          err.error.message == 'Aylık randevu kotası doldu'
        ) {
          this.presentToast('top', 'Kotanız doldu.');
        }
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    const state: any = this.Router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.freeaccount = true;
      this.odaid = state.id;
    }

    this.type = localStorage.getItem('type');
    const id = this.route.snapshot.paramMap.get('id');

    if (this.type == 'user') {
      this.UserService.getUser(Number(localStorage.getItem('id'))).subscribe({
        next: (result: any) => {
          if (result.adsoyad == null) {
            this.presentToast('top', 'Hesap bilgilerinizi güncelleyin.');
            this.accountblock = true;
            setTimeout(() => {
              this.Router.navigate(['/tabs/hesabim']);
            }, 2000);
          }
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }

    if (id) {
      this.loadPsikologData(id);
    }
  }

  ionViewWillEnter(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPsikologData(id); // Sayfa her ziyaret edildiğinde verileri yenile
    }
  }

  loadPsikologData(id: string | null): void {
    if (id) {
      this.UserService.getPsikolog(parseInt(id, 10)).subscribe({
        next: (result: any) => {
          this.psikolog = result;
          this.getPsikologSeanslar();
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  getPsikologSeanslar() {
    this.UserService.getPsikologSeans(this.psikolog.id).subscribe({
      next: (result: any) => {
        this.psikologseanslar = result;
        if (result.length == 0) {
          this.presentToast(
            'top',
            this.psikolog.adsoyad + ' çalışma planı yok.'
          );
        }
        console.log(result);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  cancel(modal: IonModal) {
    modal.dismiss(null, 'cancel');
  }
}
