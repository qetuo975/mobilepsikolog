import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private http: HttpClient) {}

  getBlogs() {
    return this.http.get('https://therapydays.com/api/general/blogs').pipe();
  }

  getBlog(id: number) {
    return this.http
      .get('https://therapydays.com/api/general/blog/' + id)
      .pipe();
  }
}
