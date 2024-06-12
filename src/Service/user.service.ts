import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'http://localhost:4000/api/user';

  constructor(private http: HttpClient) {}

  getFilterPsikolog(
    cinsiyet: any,
    yas: any,
    kategori: any,
    fiyat: any
  ): Observable<any> {
    const body = { cinsiyet, yas, kategori, fiyat };
    return this.http.post(`${this.baseUrl}/register`, body).pipe();
  }

  getPsikologs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/psikologs`).pipe();
  }

  getPsikolog(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/psikolog/${id}`).pipe();
  }


  register(email: string, password: string, type: string): Observable<any> {
    const body = { email, password, type };
    return this.http.post(`${this.baseUrl}/register`, body).pipe();
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}/login`, body).pipe();
  }
}
