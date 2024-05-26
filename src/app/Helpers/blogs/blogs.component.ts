/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

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
    // Daha fazla blog ekleyin...
  ];
}
