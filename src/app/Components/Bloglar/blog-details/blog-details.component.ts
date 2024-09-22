/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from 'src/Service/blogs.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  blog: any;
  serverpath: any = 'https://bahrikement.com/static';

  constructor(
    private blogservice: BlogsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  stripHtmlTags(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }



  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.blogservice.getBlog(parseInt(id, 10)).subscribe({
        next: (result: any) => {
          this.blog = result;
          console.log(result);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
