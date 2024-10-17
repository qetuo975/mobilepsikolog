import { UserService } from 'src/Service/user.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';

import { IonModal, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-hesabim',
  templateUrl: 'hesabim.page.html',
  styleUrls: ['hesabim.page.scss'],
})
export class HesabimPage implements OnInit {
  @ViewChild('modal1', { static: false }) modal1!: IonModal;
  @ViewChild('modal2', { static: false }) modal2!: IonModal;
  @ViewChild('modal3', { static: false }) modal3!: IonModal;
  serverpath: any = 'https://api.therapydays.com/static';
  type: any;

  constructor(
    private UserService: UserService,
    private toastController: ToastController,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  selectedTime!: string;

  ngOnInit(): void {
    const now = new Date();
    this.selectedTime = now.toISOString().slice(0, 16); // Sadece tarih ve saat kısmını alıyoruz


    this.type = localStorage.getItem('type');
    if (this.type == 'user') {
      this.setAccountUser();
    } else {
      this.UserService.getKategoriler().subscribe({
        next: (result: any) => {
          this.kategoriler = result;
        },
        error: (err: any) => {
          console.log(err);
        },
      });

      this.UserService.getPsikologSeans(
        Number(localStorage.getItem('id'))
      ).subscribe({
        next: (result: any) => {
          console.log(result);
          this.seanslar = result;
        },
        error: (err: any) => {
          console.log(err);
        },
      });

      this.setAccountPsikolog();
    }
  }

  logout()
  {
    localStorage.removeItem('id');
    localStorage.removeItem('type');
    window.location.reload();
    this.router.navigateByUrl('/login')
  }

  // Ortak Fonksiyonlar
  // --------------------------------------------
  async uploadPhoto() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64, // Base64 olarak dönecek
      source: CameraSource.Prompt, // Kullanıcıya kamera veya galeriyi seçme seçeneği sunulacak
      quality: 100, // Görüntü kalitesi %100 olacak
    });

    const base64Data: any = image.base64String;
    const fileName: string = Date.now() + '_' + `photo.${image.format}`;

    const imageBlob = this.base64ToBlob(base64Data, `image/${image.format}`);

    const formData = new FormData();
    formData.append('file', imageBlob, fileName);
    formData.append('type', String(localStorage.getItem('type')));
    formData.append('id', String(localStorage.getItem('id')));

    if (this.type !== 'user') {
      this.UserService.uploadPhotoPsikolog(formData).subscribe({
        next: (result: any) => {
          if (result) {
            this.setAccountPsikolog();
            this.presentToast('top', 'Fotoğrafınız Başarıyla Güncellendi');
          } else {
            this.presentToast('top', 'Fotoğrafınız Güncellenemedi.');
          }
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
          this.presentToast('top', 'Fotoğrafınız Güncellenemedi.');
        },
      });
    } else {
      this.UserService.uploadPhotoUser(formData).subscribe({
        next: (result: any) => {
          console.log(result);
          if (result) {
            this.setAccountUser();
            this.presentToast('top', 'Fotoğrafınız Başarıyla Güncellendi');
          } else {
            this.presentToast('top', 'Fotoğrafınız Güncellenemedi.');
          }
        },
        error: (err: any) => {
          console.log(err);
          this.presentToast('top', 'Fotoğrafınız Güncellenemedi.');
        },
      });
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

  base64ToBlob(base64: string, type: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  }

  cancel(modal: IonModal) {
    modal.dismiss(null, 'cancel');
  }

  // User Değişkenleri
  accountformUser = new FormGroup({
    adsoyad: new FormControl('', Validators.required),
    yas: new FormControl('', Validators.required),
    cinsiyet: new FormControl('', Validators.required),
    resim: new FormControl(''),
  });

  // User Fonksiyonları
  // --------------------------------------------
  accountFormUserSubmit() {
    if (this.accountformUser.valid) {
      this.UserService.updateUserAccount(
        this.accountformUser.value,
        localStorage.getItem('id')
      ).subscribe({
        next: (result: any) => {
          console.log(result);
          this.presentToast('top', 'Güncelleme Başarılı.');
        },
        error: (err: any) => {
          console.log(err);
          this.presentToast('top', 'Güncelleme Başarısız.');
        },
      });
    } else {
      console.error('Form is invalid');
      this.presentToast('top', 'Form Verilerini Doldurunuz.');
    }
  }

  writeNameUser() {
    return this.accountformUser.value.adsoyad
      ? this.accountformUser.value.adsoyad
      : 'İsminizi Güncelleyin.';
  }

  // Psikolog Fonksiyonları
  // --------------------------------------------
  accountFormPsikologSubmit() {
    if (this.accountformPsikolog.valid) {
      this.UserService.updatePsikologAccount(
        this.accountformPsikolog.value,
        localStorage.getItem('id')
      ).subscribe({
        next: (result: any) => {
          console.log(result);
          this.presentToast('top', 'Güncelleme Başarılı.');
        },
        error: (err: any) => {
          console.log(err);
          this.presentToast('top', 'Güncelleme Başarısız.');
        },
      });
    } else {
      console.error('Form is invalid');
      this.presentToast('top', 'Form Verilerini Doldurunuz.');
    }
  }

  balanceFormPsikologSubmit() {
    if (this.balanceformPsikolog.valid) {
      this.UserService.balancePsikologAccount(
        this.balanceformPsikolog.value,
        localStorage.getItem('id')
      ).subscribe({
        next: (result: any) => {
          console.log(result);
          this.presentToast('top', 'Güncelleme Başarılı.');
        },
        error: (err: any) => {
          console.log(err);
          this.presentToast('top', 'Güncelleme Başarısız.');
        },
      });
    } else {
      console.error('Form is invalid');
      this.presentToast('top', 'Form Verilerini Doldurunuz.');
    }
  }

  setAccountUser() {
    this.UserService.getUser(Number(localStorage.getItem('id'))).subscribe({
      next: (result: any) => {
        const usercontrol = result.adsoyad;
        if (usercontrol) {
          this.accountformUser.patchValue({
            adsoyad: result.adsoyad,
            yas: result.yas,
            cinsiyet: result.cinsiyet,
            resim: result.resim,
          });
          console.log(this.accountformUser.value);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  psikologkategoriler: any[] = [];

  setAccountPsikolog() {
    this.UserService.getPsikolog(Number(localStorage.getItem('id'))).subscribe({
      next: (result: any) => {
        console.log(result);
        const usercontrol = result.adsoyad;
        if (usercontrol) {
          this.balance = result.bakiye;
          this.accountformPsikolog.patchValue({
            adsoyad: result.adsoyad,
            yas: result.yas,
            hakkimda: result.hakkimda,
            universite: result.universite,
            bolum: result.bolum,
            cinsiyet: result.cinsiyet,
            resim: result.resim,
            kategori: result.kategoriler.map((pk: any) => pk.baslik),
            ozellik1: result.ozellikler[0].baslik,
            ozellik2: result.ozellikler[1].baslik,
            ozellik3: result.ozellikler[2].baslik,
            ozellik4: result.ozellikler[3].baslik,
            ozellik5: result.ozellikler[4].baslik,
          });

          this.psikologkategoriler = result.kategoriler.map((pk: any) => pk.baslik);

          // Change detection to update the view
          this.cdr.detectChanges();

          console.log(this.psikologkategoriler);
          console.log(this.kategoriler);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  compareFn(option1: any, option2: any) {
    return option1 && option2 && option1.baslik === option2.baslik;
  }

  trackByFn(index: number, kategori: any) {
    return kategori.baslik; // Veya kategori.id gibi benzersiz bir özellik
  }

  writeNamePsikolog() {
    return this.accountformPsikolog.value.adsoyad
      ? this.accountformPsikolog.value.adsoyad
      : 'İsminizi Güncelleyin.';
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} Karakter Kaldı`;
  }

  onPopoverDismiss() {
    this.isPopoverOpen = false;
  }

  addSeans() {
    if (this.startTime && this.endTime && this.selectedDay) {

      // Bitiş saatinin başlangıç saatinden küçük olup olmadığını kontrol et (moment.js ile)
      const startTimeMoment = moment(this.startTime, 'HH:mm');
      const endTimeMoment = moment(this.endTime, 'HH:mm');

      if (endTimeMoment.isBefore(startTimeMoment)) {
        this.presentToast('top', 'Bitiş saati başlangıç saatinden küçük olamaz.');
        return;
      }

      // Başlangıç ve bitiş saati arasındaki farkı hesapla
      const duration = moment.duration(endTimeMoment.diff(startTimeMoment));
      const minutes = duration.asMinutes();

      // Eğer fark 30 dakikadan az ise hata mesajı göster
      if (minutes < 30) {
        this.presentToast('top', 'Başlangıç ve bitiş saati arasında en az 30 dakika olmalıdır.');
        return;
      }

      // Çakışmaları kontrol et
      const overlaps = this.seanslar.some((seans) => {
        return (
          (this.startTime >= seans.startTime && this.startTime < seans.endTime) ||
          (this.endTime > seans.startTime && this.endTime <= seans.endTime) ||
          (seans.startTime >= this.startTime && seans.endTime <= this.endTime)
        ) && this.selectedDay === seans.selectedDay;
      });

      // Eklemek istediğiniz seansın zaten listede olup olmadığını kontrol et (moment.js ile)
      const alreadyExists = this.seanslar.some((seans) => {
        const newStartTime = moment(this.startTime, 'HH:mm');
        const newEndTime = moment(this.endTime, 'HH:mm');
        const existingStartTime = moment(seans.baslangicsaat, 'HH:mm');
        const existingEndTime = moment(seans.bitissaat, 'HH:mm');

        return (
          newStartTime.isSame(existingStartTime) &&
          newEndTime.isSame(existingEndTime) &&
          this.selectedDay === seans.tarih
        );
      });

      console.log(alreadyExists);
      console.log(this.seanslar);

      if (overlaps) {
        this.presentToast('top', 'Seçtiğiniz saat aralığı başka bir seans ile çakışmaktadır.');
        return;
      }

      if (alreadyExists) {
        this.presentToast('top', 'Bu seans zaten eklenmiş.');
        return;
      }

      if (this.startTime == 'Invalid Date' || this.endTime == 'Invalid Date')
      {
        this.presentToast('top', 'Lütfen başlanıç ve bitiş saati seçiniz.');
        return
      }
      // Seans ekleme
      this.UserService.addSeans(
        this.startTime,
        this.endTime,
        this.selectedDay,
        localStorage.getItem('id')
      ).subscribe({
        next: (result: any) => {
          // this.seanslar dizisini güncelle
          this.seanslar = [...this.seanslar, result]; // Yeni seansı ekleyerek güncelleme
          // veya
          // this.UserService.getSeanslar().subscribe((seanslar) => {
          //   this.seanslar = seanslar;
          // }); // Sunucudan güncel seans listesini alarak güncelleme

          console.log(result);
          this.startTime = '';
          this.endTime = '';
          this.selectedDay = '';
          this.presentToast('top', 'Seans Eklendi');
        },
        error: (err: any) => {
          console.log(err);
          this.presentToast('top', 'Seans Eklenirken Hata Oluştu');
        },
      });
    } else {
      this.presentToast('top', 'Gerekli Zaman Ayarlarını Giriniz.');
    }
  }


  confirmTime() {
    const time = new Date(this.selectedTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    if (this.timeType === 'startTime') {
      this.startTime = time;
    } else if (this.timeType === 'endTime') {
      this.endTime = time;
    }
    this.isPopoverOpen = false;
  }

  openPopover(ev: any, timeType: string) {
    this.timeType = timeType;
    this.isPopoverOpen = true;
  }

  // Psikolog Değişkenleri
  // --------------------------------------------
  gunler: any[] = [
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
    'Pazar',
  ];

  startTime!: string;
  endTime!: string;
  selectedDay!: string;
  isPopoverOpen: boolean = false;
  timeType!: string;
  seanslar: any[] = [];
  balance: number = 0;
  kategoriler: any[] = [];
  accountformPsikolog = new FormGroup({
    adsoyad: new FormControl('', Validators.required),
    yas: new FormControl('', Validators.required),
    hakkimda: new FormControl('', Validators.required),
    universite: new FormControl('', Validators.required),
    bolum: new FormControl('', Validators.required),
    kategori: new FormControl('', Validators.required),
    cinsiyet: new FormControl('', Validators.required),
    ozellik1: new FormControl('', Validators.required),
    ozellik2: new FormControl('', Validators.required),
    ozellik3: new FormControl('', Validators.required),
    ozellik4: new FormControl('', Validators.required),
    ozellik5: new FormControl('', Validators.required),
    resim: new FormControl(''),
  });

  balanceformPsikolog = new FormGroup({
    IBAN: new FormControl('', Validators.required),
    fiyat: new FormControl('', Validators.required),
  });
}
