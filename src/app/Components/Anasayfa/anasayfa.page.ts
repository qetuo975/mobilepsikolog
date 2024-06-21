import { BlogsService } from './../../../Service/blogs.service';
import { PsikologService } from './../../../Service/psikolog.service';
import { SeansService } from './../../../Service/seans.service';
import { UserService } from './../../../Service/user.service';
import { TestService } from './../../../Service/test.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-anasayfa',
  templateUrl: 'anasayfa.page.html',
  styleUrls: ['anasayfa.page.scss'],
})
export class AnasayfaPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  psikologlar: any[] = [];
  tests: any[] = [];
  blogs: any[] = [];

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
  isLoading: boolean = false;

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

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.type = localStorage.getItem('type');

this.searchControl.valueChanges
  .pipe(
    debounceTime(3000),
    distinctUntilChanged()
  )
  .subscribe((searchTerm) => {
    if (searchTerm) {
      this.isLoading = true;
      this.PsikologService.getSearch(searchTerm.toLowerCase()).subscribe({
        next: (result: any) => {
          this.isLoading = false;
          console.log(result);
          const navigationExtras: NavigationExtras = {
            state: {
              filterData: result,
            },
          };
          this.router.navigate(['/tabs/psikologlar'], navigationExtras);
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error(err);
        },
      });
    }
  });

    if (this.type == 'user') {
      this.SeansService.getSeansUser(this.id).subscribe({
        next: (result: any) => {
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      console.log('Psikolog Seansları');
      this.SeansService.getSeansPsikolog(this.id).subscribe({
        next: (result: any) => {
          console.log(result);
        },
        error: (err: any) => {
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
        this.router.navigate(['/tabs/psikologlar'], navigationExtras);
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
