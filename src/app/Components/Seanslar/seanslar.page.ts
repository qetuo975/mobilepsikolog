import { SeansService } from './../../../Service/seans.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-seanslar',
  templateUrl: 'seanslar.page.html',
  styleUrls: ['seanslar.page.scss'],
})
export class SeanslarPage implements OnInit {
  constructor(private SeansService: SeansService, private router: Router) {}
  selectedSegment: string = 'default';
  type: any;
  id: any;
  seanslar: any[] = [];
  randevu: any[] = [];
  gecmisseanslar: any[] = [];
  gecmisrandevular: any[] = [];
  upcomingSeanslar: any[] = [];
  pastSeanslar: any[] = [];

  upcomingrandevu: any[] = [];
  pastrandevu: any[] = [];

  serverpath: any = 'https://api.therapydays.com/static';

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.type = localStorage.getItem('type');
  }

  ionViewWillEnter(): void {
    this.getSeanslar(); // Sayfa her ziyaret edildiğinde verileri yükle
  }

  getSeanslar() {
    if (this.type == 'user') {
      this.SeansService.getSeansUser(this.id).subscribe({
        next: (result: any) => {
          this.seanslar = result.seans;
          this.gecmisseanslar = result.tarihigecmisseans;
          this.checkSeansDates();
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });

      this.SeansService.getRandevuUser(this.id).subscribe({
        next: (result: any) => {
          this.randevu = result.randevu;
          this.gecmisrandevular = result.tarihigecmisrandevu;
          this.checkRandevuDates();
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
          this.gecmisseanslar = result.tarihigecmisseans;
          this.checkSeansDates();
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });

      this.SeansService.getRandevuPsikolog(this.id).subscribe({
        next: (result: any) => {
          this.randevu = result.randevu;
          this.gecmisrandevular = result.tarihigecmisrandevu;
          this.checkRandevuDates();
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
    this.pastSeanslar = []; // Aynı şekilde geçmiş seanslar da sıfırlanmalı

    this.seanslar.forEach((seans) => {
      console.log('Seans:', seans);
      seans.isUpcoming = this.isSeansUpcoming(seans.tarih);
      seans.isPast = this.isSeansPast(seans.tarih);

      if (seans.isUpcoming) {
        this.upcomingSeanslar.push(seans);
      } else if (seans.isPast) {
        this.pastSeanslar.push(seans);
      }
    });
    if (this.pastSeanslar) {
      this.SeansService.deletePastSeans(this.pastSeanslar).subscribe({
        next: (result: any) => {
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
    console.log('Upcoming Seanslar: ', this.upcomingSeanslar);
    console.log('Past Seanslar: ', this.pastSeanslar);
  }

  checkRandevuDates() {
    this.randevu.forEach((seans) => {
      seans.isUpcoming = this.isSeansUpcoming(seans.tarih);
      seans.isPast = this.isSeansPast(seans.tarih);

      if (seans.isUpcoming) {
        this.upcomingrandevu.push(seans);
      } else if (seans.isPast) {
        this.pastrandevu.push(seans);
      }
    });
    if (this.pastrandevu) {
      this.SeansService.deletePastRandevu(this.pastrandevu).subscribe({
        next: (result: any) => {
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
    console.log('Upcoming Seanslar: ', this.upcomingrandevu);
    console.log('Past Seanslar: ', this.pastrandevu);
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

  parseSeansDate(tarih: string, type: 'start' | 'end'): moment.Moment {
    console.log(tarih, type); // Gelen tarih ve type'ı kontrol etmek için
    if (!tarih) {
      console.error('Tarih değeri eksik veya undefined:', tarih);
      return moment.invalid(); // Geçersiz tarih döndür
    }

    const parts = tarih.split('|');
    if (parts.length !== 2) {
      console.error("Tarih formatı hatalı, '|' eksik:", tarih);
      return moment.invalid(); // Hatalı tarih döndür
    }

    const [dayPart, timePart] = parts.map((part) => part.trim());

    // Günü doğru hesapla: Gün bugünden küçükse, bu hafta içindeyiz, aksi takdirde gelecek hafta
    const currentDay = moment().isoWeekday();
    const dayIndex = this.getDayOfWeek(dayPart); // Pazartesi=1, Salı=2, ...

    let seansDate = moment();

    // Eğer seans günü bugünden küçükse, bu hafta içinde kalırız, aksi takdirde bir sonraki haftaya geçeriz
    if (dayIndex >= currentDay) {
      seansDate = seansDate.isoWeekday(dayIndex); // Aynı hafta içinde ayarla
    } else {
      seansDate = seansDate.add(1, 'weeks').isoWeekday(dayIndex); // Bir sonraki haftaya ayarla
    }

    // Saat temizleme işlemleri
    const times = timePart.match(/(\d{1,2}:\d{2})/g); // Sadece saat formatındaki kısımları çek
    if (!times || times.length !== 2) {
      console.error('Saat formatı doğru değil:', timePart);
      return moment.invalid(); // Hatalı saat aralığı döndür
    }

    const [startTime, endTime] = times;

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
}
