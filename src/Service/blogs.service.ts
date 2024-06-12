import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private http: HttpClient) {}

  getBlogs() {
    return this.http.get('http://localhost:4000/api/general/blogs').pipe();
  }

  getBlog(id: number) {
    return this.http.get('http://localhost:4000/api/general/blog/' + id).pipe();
  }
}
