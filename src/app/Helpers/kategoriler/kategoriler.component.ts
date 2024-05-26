/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kategoriler',
  templateUrl: './kategoriler.component.html',
  styleUrls: ['./kategoriler.component.scss'],
})
export class KategorilerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

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
}
