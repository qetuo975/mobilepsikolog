import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'psikologlar.page.html',
  styleUrls: ['psikologlar.page.scss'],
})
export class PsikologlarPage {
  constructor() {}

  cards = [
    {
      image:
        'https://cdn.iconscout.com/icon/premium/png-512-thumb/hurt-and-rescue-principle-5904174-4958401.png?f=webp&w=256',
      title: 'Aile Terapisi',
    },
    {
      image:
        'https://cdn.iconscout.com/icon/premium/png-512-thumb/effective-packaging-5904169-4958396.png?f=webp&w=256',
      title: 'Yetişkin Psikoloji',
    },
    {
      image:
        'https://cdn.iconscout.com/icon/premium/png-512-thumb/facial-coding-5904158-4958385.png?f=webp&w=256',
      title: 'Sınav Kaygısı',
    },
    {
      image:
        'https://cdn.iconscout.com/icon/premium/png-512-thumb/audio-branding-5904166-4958393.png?f=webp&w=256',
      title: 'Cinsel Terapi',
    },
  ];

  profiles = [
    {
      image:
        'https://www.catholicsingles.com/wp-content/uploads/2020/06/blog-header-3.png',
      name: 'Yunus Emre',
      reviews: 15,
      rating: 4.7,
      specialty: 'Çocuk Psikolojisi',
      isActive: true
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4j6P_40m6z-_ZbAVkUsKt05BmGX8WUX-2cuY1PMLFng&s',
      name: 'Ayşe Kadın',
      reviews: 20,
      rating: 4.8,
      specialty: 'Aile Terapisi',
            isActive: true
    },
    {
      image:
        'https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg',
      name: 'Ahmet Kırılan',
      reviews: 10,
      rating: 4.5,
      specialty: 'Klinik Psikolog',
            isActive: false
    },
    // Daha fazla profil ekleyebilirsiniz
  ];
}
