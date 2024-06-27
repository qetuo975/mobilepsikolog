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
  gecmisseanslar: any[] = [];
  upcomingSeanslar: any[] = [];
  pastSeanslar: any[] = [];

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.type = localStorage.getItem('type');

    this.getSeanslar();
  }

  getSeanslar() {
    if (this.type == 'user') {
      this.SeansService.getSeansUser(this.id).subscribe({
        next: (result: any) => {
          (this.seanslar = result.seans),
            (this.gecmisseanslar = result.tarihigecmisseans);
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
          this.gecmisseanslar = result.tarihigecmisseans;
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
    const startTime = timePart.split(':')[0].trim();
    const dayOfWeek = this.getDayOfWeek(dayPart);

    console.log('GÜN: ', dayPart);
    console.log('BAŞLANGIÇ SAATİ: ', startTime);
    console.log('GÜN NUMARASI: ', dayOfWeek);

    const currentWeek = moment().isoWeek();
    const currentYear = moment().year();

    return moment()
      .isoWeek(currentWeek)
      .day(dayOfWeek)
      .set({
        hour: parseInt(startTime.split(':')[0], 10),
        minute: parseInt(startTime.split(':')[1], 10),
        second: 0,
        millisecond: 0,
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
