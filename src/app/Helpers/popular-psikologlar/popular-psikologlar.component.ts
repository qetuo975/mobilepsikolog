/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-psikologlar',
  templateUrl: './popular-psikologlar.component.html',
  styleUrls: ['./popular-psikologlar.component.scss'],
})
export class PopularPsikologlarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  profiles = [
    {
      image:
        'https://www.catholicsingles.com/wp-content/uploads/2020/06/blog-header-3.png',
      name: 'Yunus Emre',
      reviews: 15,
      rating: 4.7,
      specialty: 'Çocuk Psikolojisi',
      isActive: true,
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4j6P_40m6z-_ZbAVkUsKt05BmGX8WUX-2cuY1PMLFng&s',
      name: 'Ayşe Kadın',
      reviews: 20,
      rating: 4.8,
      specialty: 'Aile Terapisi',
      isActive: true,
    },
    {
      image:
        'https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg',
      name: 'Ahmet Kırılan',
      reviews: 10,
      rating: 4.5,
      specialty: 'Klinik Psikolog',
      isActive: false,
    },
    // Daha fazla profil ekleyebilirsiniz
  ];
}
