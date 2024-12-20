import { BlogsService } from './../../../Service/blogs.service';
import { PsikologService } from './../../../Service/psikolog.service';
import { SeansService } from './../../../Service/seans.service';
import { UserService } from './../../../Service/user.service';
import { TestService } from './../../../Service/test.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, IonSearchbar, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import moment from 'moment';
import { FCMService } from 'src/Service/fcm.service';


@Component({
  selector: 'app-anasayfa',
  templateUrl: 'anasayfa.page.html',
  styleUrls: ['anasayfa.page.scss'],
})
export class AnasayfaPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(IonSearchbar, { static: false }) searchbar!: IonSearchbar;

  psikologlar: any[] = [];
  tests: any[] = [];
  blogs: any[] = [];
  serverpath: any = 'https://api.therapydays.com/static';
  banners: any;
  arkaplan: any;

  filterPsikologForm = new FormGroup({
    cinsiyet: new FormControl('', Validators.required),
    fiyat: new FormControl(
      {
        lower: 0,
        upper: 10000,
      },
      Validators.required
    ),
    yas: new FormControl(
      {
        lower: 20,
        upper: 50,
      },
      Validators.required
    ),
    kategori: new FormControl('', Validators.required),
  });

  type: any;
  id: any;
  ad: any;
  seanslar: any[] = [];
  upcomingSeanslar: any[] = [];

  psikologkategoriler: any;
  secilenkategori: string = '';

  constructor(
    private TestService: TestService,
    private SeansService: SeansService,
    private PsikologService: PsikologService,
    private toastController: ToastController,
    private UserService: UserService,
    private BlogsService: BlogsService,
    private router: Router,
    private fcmService: FCMService
  ) {}



  async presentToast(position: 'top' | 'middle' | 'bottom', message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      color: color
    });

    await toast.present();
  }

  sendToken()
  {
    const token = localStorage.getItem('fcmtoken');
    this.fcmService.sendToken(token, this.id, this.type).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  navigateChat(seans: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        chatData: {
          target: seans.user
            ? { target: seans.user, type: 'User' }
            : { target: seans.psikolog, type: 'Psikolog' },
        },
      },
    };
    this.router.navigate(['/chat'], navigationExtras);
  }

  ionViewWillEnter(): void {
    // Sayfa her ziyaret edildiğinde verileri yeniden yükle
    this.init();
  }

  insertPuan(id: number)
  {
    this.UserService.insertPuan(this.type, this.id, id).subscribe({
      next: (res: any) => {
        this.presentToast("top", "Beğeni Paylaşıldı", 'success');
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        this.presentToast("top", "Beğeni Paylaşılamadı", 'danger');
      }
    })
  }

  getSeanslar() {
    if (this.type == 'user') {
      this.SeansService.getSeansUser(this.id).subscribe({
        next: (result: any) => {
          this.seanslar = result.seans;
          this.checkSeansDates();
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      this.SeansService.getSeansPsikolog(this.id).subscribe({
        next: (result: any) => {
          this.seanslar = result.seans;
          this.checkSeansDates();
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  checkSeansDates() {
    this.upcomingSeanslar = []; // Bu diziyi sıfırlayalım ki her seferinde tekrar kontrol edilsin

    this.seanslar.forEach((seans) => {
      console.log('Seans:', seans);
      seans.isUpcoming = this.isSeansUpcoming(seans.tarih);
      seans.isPast = this.isSeansPast(seans.tarih);

      if (seans.isUpcoming) {
        this.upcomingSeanslar.push(seans);
      }
    });

    console.log('Upcoming Seanslar: ', this.upcomingSeanslar);
  }

  isSeansUpcoming(tarih: string): boolean {
    const seansTarih = this.parseSeansDate(tarih, 'start');
    const seansBitis = this.parseSeansDate(tarih, 'end');
    const currentDate = moment();

    console.log(
      'Seans Başlangıç:',
      seansTarih.format(),
      'Seans Bitiş:',
      seansBitis.format(),
      'Şu Anki Tarih:',
      currentDate.format()
    );

    return currentDate.isBetween(seansTarih, seansBitis, null, '[)');
  }

  isSeansPast(tarih: string): boolean {
    const seansBitis = this.parseSeansDate(tarih, 'end');
    const currentDate = moment();

    console.log(
      'Seans Bitiş:',
      seansBitis.format(),
      'Şu Anki Tarih:',
      currentDate.format()
    );

    return currentDate.isAfter(seansBitis);
  }

  parseSeansDate(tarih: string, type: 'start' | 'end'): moment.Moment {
    console.log(tarih, type); // Gelen tarih ve type'ı kontrol etmek için
    if (!tarih) {
      console.error('Tarih değeri eksik veya undefined:', tarih);
      return moment.invalid(); // Geçersiz tarih döndür
    }

    // Tarihi '|' işareti ile böl
    const parts = tarih.split('|');
    if (parts.length !== 2) {
      console.error("Tarih formatı hatalı, '|' eksik:", tarih);
      return moment.invalid(); // Hatalı tarih döndür
    }

    // Tarih ve saat kısmını ayır
    const dayPart = parts[0].trim();
    const timePart = parts[1].trim();

    // Tarihi gün.ay.yıl formatında ayır
    const dateParts = dayPart.split('.');
    if (dateParts.length !== 3) {
      console.error("Tarih formatı hatalı, gün.ay.yıl eksik:", dayPart);
      return moment.invalid(); // Hatalı tarih döndür
    }

    const [day, month, year] = dateParts;

    // Seans tarihini moment ile oluştur (gün.ay.yıl)
    let seansDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    if (!seansDate.isValid()) {
      console.error('Tarih geçersiz:', seansDate);
      return moment.invalid(); // Geçersiz tarih döndür
    }

    // Saat kısmını doğru şekilde ayır (önce boşlukları sil, sonra saatleri ikiye böl)
    const times = timePart.split(':');
    const [startTime, endTime] = timePart.split(' : ').map((time) => time.trim());

    if (!startTime || !endTime) {
      console.error('Başlangıç veya bitiş saat hatalı:', timePart);
      return moment.invalid();
    }

    // Başlangıç saati işlemi
    if (type === 'start') {
      const [startHour, startMinute] = startTime.split(':');
      return seansDate.set({
        hour: parseInt(startHour, 10),
        minute: parseInt(startMinute, 10),
      });
    }
    // Bitiş saati işlemi
    else {
      const [endHour, endMinute] = endTime.split(':');
      return seansDate.set({
        hour: parseInt(endHour, 10),
        minute: parseInt(endMinute, 10),
      });
    }
  }

  getDayOfWeek(day: string): number {
    const days: { [key: string]: number } = {
      Pazartesi: 1,
      Salı: 2,
      Çarşamba: 3,
      Perşembe: 4,
      Cuma: 5,
      Cumartesi: 6,
      Pazar: 7,
    };
    return days[day] ?? -1;
  }


  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.type = localStorage.getItem('type');
   // id ve type kontrolü
   if (!this.id || !this.type) {
    // Kullanıcıyı login sayfasına yönlendir
    this.router.navigate(['/login']);
  } else {
    this.init();
    this.sendToken();
  }
  }

  init()
  {
    this.getSeanslar();

    this.BlogsService.getBanners().subscribe({
      next: (res: any) => {
        this.banners = res.Data;
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    });

    this.BlogsService.getArkaplan().subscribe({
      next: (res: any) => {
        this.arkaplan = res.Data;
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    });

    if (this.type == 'user') {
          this.UserService.getUser(this.id).subscribe({
            next: (result: any) => {
              console.log(result);
              this.ad = result.adsoyad;
            },
            error: (err) => {
              console.log(err);
            },
          });
    } else {
    this.UserService.getPsikolog(this.id).subscribe({
      next: (result) => {
        this.ad = result.adsoyad;
      },
      error: (err) => {
        console.log(err);
      },
    });
    }

    this.BlogsService.getBlogs().subscribe({
      next: (result: any) => {
        this.blogs = result;
        console.log(result);
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    this.PsikologService.getKategori().subscribe({
      next: (result: any) => {
        this.psikologkategoriler = result;
        console.log(result);
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    this.TestService.getTests().subscribe({
      next: (result: any) => {
        console.log(result);
        this.tests = result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    this.UserService.getPsikologs().subscribe({
      next: (result: any) => {
        this.psikologlar = result;
        console.log(result);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  filterPsikolog() {
    this.PsikologService.filterpsikolog(
      this.filterPsikologForm.value
    ).subscribe({
      next: (result: any) => {
        console.log(result);
        const navigationExtras: NavigationExtras = {
          state: {
            filterData: result,
          },
        };
        this.cancel();
        this.router.navigate(['/filterpsikologlar'], navigationExtras);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    console.log(this.filterPsikologForm.value);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
