import { api } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private http: HttpClient) {}


  getArkaplan()
  {
    return this.http.get(`${api}/general/arkaplan`).pipe();
  }

  getPreviewDoctor()
  {
    return this.http.get(`${api}/general/getpreviewdoctor`).pipe();
  }

  getPreview()
  {
    return this.http.get(`${api}/general/getpreview`).pipe();
  }

  getBanners()
  {
    return this.http.get(`${api}/general/banner`).pipe();
  }

  getBlogs() {
    return this.http.get(`${api}/general/blogs`).pipe();
  }

  getBlog(id: number) {
    return this.http
      .get(`${api}/general/blog/` + id)
      .pipe();
  }
}
