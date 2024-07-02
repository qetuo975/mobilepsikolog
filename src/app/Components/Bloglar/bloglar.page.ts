import { BlogsService } from './../../../Service/blogs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bloglar',
  templateUrl: 'bloglar.page.html',
  styleUrls: ['bloglar.page.scss'],
})
export class BloglarPage implements OnInit {
  constructor(private BlogsService: BlogsService) {}
  serverpath: any = 'https://therapydays.com/static';
  ngOnInit(): void {
    this.BlogsService.getBlogs().subscribe({
      next: (result: any) => {
        this.blogs = result;
        console.log(result);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  blogs: any[] = [];
}
