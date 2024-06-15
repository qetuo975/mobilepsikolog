import { PsikologService } from './../../../Service/psikolog.service';
import { SeansService } from './../../../Service/seans.service';
import { UserService } from './../../../Service/user.service';
import { TestService } from './../../../Service/test.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-anasayfa',
  templateUrl: 'anasayfa.page.html',
  styleUrls: ['anasayfa.page.scss'],
})
export class AnasayfaPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

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

  psikologkategoriler: any;
  secilenkategori: string = '';

  constructor(
    private TestService: TestService,
    private SeansService: SeansService,
    private PsikologService: PsikologService,
    private UserService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.type = localStorage.getItem('type');

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
      this.SeansService.getSeansPsikolog(this.id).subscribe({
        next: (result: any) => {
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }

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
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    this.UserService.getPsikologs().subscribe({
      next: (result: any) => {
        console.log(result);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  filterPsikolog()
  {
    this.PsikologService.filterpsikolog(this.filterPsikologForm.value).subscribe({
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
      }
    });
    console.log(this.filterPsikologForm.value);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  psikologlar: any[] = [
    {
      photo:
        'https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1718029483~exp=1718033083~hmac=66000c73be91ab885c66afd007c6d8b8525732792f80803e8d3ddc8ffba74bb9&w=740',
      fiyat: 1250,
      unvan: 'Genel Terapist',
      name: 'Dr. Ali Fırat',
    },
    {
      photo:
        'https://img.freepik.com/free-photo/young-handsome-man-posing_144627-28075.jpg?t=st=1718029496~exp=1718033096~hmac=9c4e8f8f1142dd4e2fb30139d8514fb8d04d496b067ef060be3ce3ad6396c89c&w=740',
      fiyat: 2000,
      unvan: 'Cinsel Terapist',
      name: 'Dr. Yusuf Tekin',
    },
    {
      photo:
        'https://img.freepik.com/free-photo/excited-beautiful-young-woman-smiling-hopeful-camera_176420-30191.jpg?t=st=1718029504~exp=1718033104~hmac=958ba90ea32c8b5c737b8b6893df59f0b6358711f6eeb4cb199536f41c565cbb&w=1380',
      fiyat: 1500,
      unvan: 'Aile Terapisti',
      name: 'Dr. Nirmala Azalea',
    },
    {
      photo:
        'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1718029720~exp=1718033320~hmac=478a79b9cd01f1230d0e33a86e058fc8cbe142a08752184c0d0fabdccb0c96c0&w=1380',
      fiyat: 750,
      unvan: 'Ruhsal Terapist',
      name: 'Dr. Murat Can',
    },
  ];

  tests: any[] = [
    {
      title: 'Depresyon Testi',
      photo: 'depresyon.png',
      id: 1,
    },
    {
      title: 'Stres Testi',
      photo: 'stres.png',
      id: 2,
    },
    {
      title: 'Yanlızlık Testi',
      photo: 'alone.png',
      id: 3,
    },
  ];

  blogs: any[] = [
    {
      id: 1,
      title: 'Depresyon Nedir ve Tedavisi Nasıldır ?',
      date: '2024-05-26',
      imageUrl:
        'https://i.pinimg.com/originals/e8/f5/df/e8f5df8b5ecbaa3c335d0ef29a1537da.png',
    },
    {
      id: 2,
      title: 'Dispiyonsif Kimlik Bozukluluğu Nedir ?',
      date: '2024-05-25',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQwjzG6eLUOpO63SM-Z5zCFe7bfI0QjUt6ztWotLGC0Q&s',
    },
  ];
}
