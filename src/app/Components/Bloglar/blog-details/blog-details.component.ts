/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent  implements OnInit {
  blog: any =     {
      id: 1,
      content: 'Lorem as de fia cliner, Lorem as de fia cliner, Lorem as de fia cliner, Lorem as de fia cliner',
      title: 'Depresyon Nedir ve Tedavisi Nasıldır ?',
      date: '2024-05-26',
      imageUrl:
        'https://i.pinimg.com/originals/e8/f5/df/e8f5df8b5ecbaa3c335d0ef29a1537da.png',
    };
  constructor() { }

  ngOnInit() {}

}
