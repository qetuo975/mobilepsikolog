import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  getTests() {
    return this.http.get('http://localhost:4000/api/general/tests').pipe();
  }

  getTest(id: number) {
    return this.http.get('http://localhost:4000/api/general/test/' + id).pipe();
  }
}
