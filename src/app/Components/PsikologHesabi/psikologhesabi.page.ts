import { UserService } from './../../../Service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';

import moment from 'moment';
moment.locale('en');  // Moment'i İngilizce olarak ayarlıyoruz

@Component({
  selector: 'app-psikologhesabi',
  templateUrl: 'psikologhesabi.page.html',
  styleUrls: ['psikologhesabi.page.scss'],
})
export class PsikologHesabiPage implements OnInit {
  @ViewChild('UserSeansModal', { static: false }) UserSeansModal!: IonModal;
  serverpath: any = 'https://api.therapydays.com/static';

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

  seansAdd() {
    const navigationExtras: NavigationExtras = {
      state: {
        data: {
          tarih: this.selectedSeans.tarih,
          start: this.selectedSeans.baslangicsaat,
          end: this.selectedSeans.bitissaat,
          psikologId: this.psikolog.id,
          free: this.freeaccount
        },
      },
    };
    console.log(this.selectedSeans);
    this.cancel(this.UserSeansModal);
    this.Router.navigate(['/pay'], navigationExtras);
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
    console.log(state);
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

  availableTimes: any[] = [];
  availableDates: any[] = []; // Sadece geçerli tarihleri tutacak dizi
  availableDays: number[] = [];
  availableMonths: number[] = [];
  minDate!: string;
  maxDate!: string;
  selectedDate!: string;

  getPsikologSeanslar() {
    this.UserService.getPsikologSeans(this.psikolog.id).subscribe({
      next: (result: any) => {
        this.psikologseanslar = result;
        console.log(this.psikologseanslar);

        if (result.length === 0) {
          this.presentToast('top', this.psikolog.adsoyad + ' çalışma planı yok.');
        } else {
          // Benzersiz ve geçerli tarihleri alarak formatını düzenleyelim
          this.availableDates = [...new Set(result.map((seans: any) => {
            const [day, month, year] = seans.tarih.split('.');
            return `${year}-${month}-${day}`; // YYYY-MM-DD formatına dönüştür
          }))];

          // Geçerli gün ve ay değerlerini ayarla
          this.availableDays = this.availableDates.map(date => new Date(date).getDate());
          this.availableMonths = [...new Set(this.availableDates.map(date => new Date(date).getMonth() + 1))];

          // Min ve max tarihi ayarla
          this.minDate = new Date(Math.min(...this.availableDates.map(date => new Date(date).getTime()))).toISOString().split('T')[0];
          this.maxDate = new Date(Math.max(...this.availableDates.map(date => new Date(date).getTime()))).toISOString().split('T')[0];

          console.log(result);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onDateChange(event: any) {
    const selectedDate = new Date(event.detail.value).toLocaleDateString('tr-TR');
    this.selectedDate = selectedDate;
    this.availableTimes = this.psikologseanslar.filter(
      (seans: any) => seans.tarih === selectedDate && !seans.dolu
    );
  }

  cancel(modal: IonModal) {
    modal.dismiss(null, 'cancel');
  }
}
