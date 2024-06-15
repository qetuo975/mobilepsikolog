import { PsikologService } from './../../../Service/psikolog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-psikologlar',
  templateUrl: 'psikologlar.page.html',
  styleUrls: ['psikologlar.page.scss'],
})
export class PsikologlarPage implements OnInit {
  constructor(
    private PsikologService: PsikologService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      const filterData = state['filterData'];
      console.log(filterData);
    } else {
      this.PsikologService.getPsikologs().subscribe({
        next: (result: any) => {
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
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
}
