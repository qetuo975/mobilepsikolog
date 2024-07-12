import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = `${api}/general`;

  getTests() {
    return this.http.get(`${this.baseUrl}/tests`).pipe();
  }

  getTest(id: number) {
    return this.http
      .get(`${this.baseUrl}/test/` + id)
      .pipe();
  }
}
