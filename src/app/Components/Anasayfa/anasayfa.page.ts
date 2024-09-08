import { BlogsService } from './../../../Service/blogs.service';
import { PsikologService } from './../../../Service/psikolog.service';
import { SeansService } from './../../../Service/seans.service';
import { UserService } from './../../../Service/user.service';
import { TestService } from './../../../Service/test.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, IonSearchbar } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import moment from 'moment';


@Component({
  selector: 'app-anasayfa',
  templateUrl: 'anasayfa.page.html',
  styleUrls: ['anasayfa.page.scss'],
})
export class AnasayfaPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(IonSearchbar, { static: false }) searchbar!: IonSearchbar;
  private focusTimeout: any;
  psikologlar: any[] = [];
  tests: any[] = [];
  blogs: any[] = [];
  serverpath: any = 'https://bahrikement.com/static';
  searchControl: FormControl = new FormControl();

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
    private UserService: UserService,
    private BlogsService: BlogsService,
    private router: Router
  ) {}

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
    this.seanslar.forEach((seans) => {
      seans.isUpcoming = this.isSeansUpcoming(seans.tarih);
      seans.isPast = this.isSeansPast(seans.tarih);

      if (seans.isUpcoming) {
        this.upcomingSeanslar.push(seans);
      }
    });
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

  parseSeansDate(tarih: string): moment.Moment {
    const [dayPart, timePart] = tarih.split('|').map((part) => part.trim());
    const startTime = timePart.split(':')[0].trim();
    const dayOfWeek = this.getDayOfWeek(dayPart);

    const currentWeek = moment().isoWeek();

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

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.type = localStorage.getItem('type');

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




    this.searchControl.valueChanges
      .pipe(debounceTime(3000), distinctUntilChanged())
      .subscribe((searchTerm) => {
        if (searchTerm) {
          this.PsikologService.getSearch(searchTerm.toLowerCase()).subscribe({
            next: (result: any) => {
              console.log(result);
              const navigationExtras: NavigationExtras = {
                state: {
                  filterData: result,
                },
              };
              this.searchControl.reset();
              this.router.navigate(['/filterpsikologlar'], navigationExtras);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        }
      });

    this.getSeanslar();

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
