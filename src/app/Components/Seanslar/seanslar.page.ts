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
  upcomingSeanslar: any[] = [];
  upcomingrandevu: any[] = [];

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

  checkRandevuDates() {
    this.randevu.forEach((seans) => {
      seans.isUpcoming = this.isSeansUpcoming(seans.tarih);
      seans.isPast = this.isSeansPast(seans.tarih);

      if (seans.isUpcoming) {
        this.upcomingrandevu.push(seans);
      }
    });
    console.log('Upcoming Seanslar: ', this.upcomingrandevu);
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
