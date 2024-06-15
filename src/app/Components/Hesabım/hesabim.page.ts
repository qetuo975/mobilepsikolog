import { UserService } from 'src/Service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';

import { IonModal, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hesabim',
  templateUrl: 'hesabim.page.html',
  styleUrls: ['hesabim.page.scss'],
})
export class HesabimPage implements OnInit {
  @ViewChild('modal1', { static: false }) modal1!: IonModal;
  @ViewChild('modal2', { static: false }) modal2!: IonModal;
  @ViewChild('modal3', { static: false }) modal3!: IonModal;

  accountform = new FormGroup({
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
  });

  balanceform = new FormGroup({
    IBAN: new FormControl('', Validators.required),
  });

  balance: number = 0;
  kategoriler: any[] = [];
  gunler: any[] = [
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
    'Pazar',
  ];

  starttimepopover: boolean = false;

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  accountFormSubmit() {
    if (this.accountform.valid) {
      this.UserService.updatePsikologAccount(
        this.accountform.value,
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

  balanceFormSubmit() {
    if (this.balanceform.valid) {
      this.UserService.balancePsikologAccount(
        this.balanceform.value,
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

  setAccount() {
    this.UserService.getPsikolog(Number(localStorage.getItem('id'))).subscribe({
      next: (result: any) => {
        console.log(result);
        const usercontrol = result.adsoyad;
        if (usercontrol) {
          this.balance = result.bakiye;
          this.accountform.patchValue({
            adsoyad: result.adsoyad,
            yas: result.yas,
            hakkimda: result.hakkimda,
            universite: result.universite,
            bolum: result.bolum,
            cinsiyet: result.cinsiyet,
            kategori: result.kategoriler[0].baslik,
            ozellik1: result.ozellikler[0].baslik,
            ozellik2: result.ozellikler[1].baslik,
            ozellik3: result.ozellikler[2].baslik,
            ozellik4: result.ozellikler[3].baslik,
            ozellik5: result.ozellikler[4].baslik,
          });
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  startTime!: string;
  endTime!: string;
  selectedDay!: string;
  isPopoverOpen: boolean = false;
  selectedTime!: string;
  timeType!: string;
  seanslar: any[] = [];
  onPopoverDismiss() {
    this.isPopoverOpen = false;
  }

  addSeans() {
    if (this.startTime && this.endTime && this.selectedDay) {
      this.UserService.addSeans(
        this.startTime,
        this.endTime,
        this.selectedDay,
        localStorage.getItem('id')
      ).subscribe({
        next: (result: any) => {
          this.seanslar.push(result);
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

  constructor(
    private UserService: UserService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
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

    this.setAccount();
  }

  async uploadPhoto() {
    const image: Photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // Görüntü URI olarak dönecek
      source: CameraSource.Prompt, // Kullanıcıya kamera veya galeriyi seçme seçeneği sunulacak
      quality: 100, // Görüntü kalitesi %100 olacak
    });

    const base64Data: any = image.base64String;
    const fileName: any = `photo.${image.format}`;
    const imageBlob = this.base64ToBlob(base64Data, `image/${image.format}`);

        const formData = new FormData();
        formData.append('file', imageBlob, fileName);

    this.UserService.uploadPhoto(formData).subscribe({
      next: (result: any) => {
        console.log(result);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  base64ToBlob(base64Data: string, contentType: string) {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  cancel(modal: IonModal) {
    modal.dismiss(null, 'cancel');
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} Karakter Kaldı`;
  }

  writeName()
  {
    return this.accountform.value.adsoyad ? this.accountform.value.adsoyad: 'İsminizi Güncelleyin.'
  }

  writeKategori()
  {
    return this.accountform.value.kategori
      ? this.accountform.value.kategori
      : 'İsminizi Güncelleyin.';
  }
}
