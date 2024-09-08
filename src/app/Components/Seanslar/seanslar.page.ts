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

  serverpath: any = 'https://bahrikement.com/static';

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
    this.seanslar.forEach((seans) => {
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
    const seansTarih = this.parseSeansDate(tarih);
    const currentDate = moment();
    const seansBitis = seansTarih.clone().add(2, 'hours'); // Seans bitiş saati, seans süresi 2 saat olduğunu varsaydım

    return currentDate.isBetween(seansTarih, seansBitis);
  }

  isSeansPast(tarih: string): boolean {
    const seansTarih = this.parseSeansDate(tarih);
    const currentDate = moment();
    return currentDate.isAfter(seansTarih.clone().add(2, 'hours'));
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


  parseSeansDate(tarih: string): moment.Moment {
    const [dayPart, timePart] = tarih.split('|').map((part) => part.trim());
    const [startHour, startMinute] = timePart.split(':').map(part => part.trim());

    console.log('GÜN: ', dayPart);
    console.log('BAŞLANGIÇ SAATİ: ', startHour + ":" + startMinute);

    // Şu anki tarihi alıyoruz
    let currentDate = moment();

    // Eğer seans günü Pazar ve gelecek Pazar günü olması gerekiyorsa, gün ve saat bilgisi ile tam tarih oluşturuyoruz
    return moment().day(dayPart).set({
      hour: parseInt(startHour, 10),
      minute: parseInt(startMinute, 10),
      second: 0,
      millisecond: 0
    });
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
