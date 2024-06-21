import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'http://localhost:4000/api/user';
  private general: string = 'http://localhost:4000/api/general';

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

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${id}`).pipe();
  }

  getKategoriler(): Observable<any> {
    return this.http.get(`${this.general}/kategoriler`).pipe();
  }

  register(email: string, password: string, type: string): Observable<any> {
    const body = { email, password, type };
    return this.http.post(`${this.baseUrl}/register`, body).pipe();
  }

  updatePsikologAccount(accountData: any, id: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/updatepsikologaccount`, {
      accountData,
      id,
    });
  }

  updateUserAccount(accountData: any, id: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateuseraccount`, {
      accountData,
      id,
    });
  }

  uploadPhotoPsikolog(formdata: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/uploadphotopsikolog`, formdata);
  }

  uploadPhotoUser(formdata: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/uploadphotouser`, formdata);
  }

  addSeans(start: any, end: any, day: any, id: any): Observable<any> {
    const body = { start, end, day, id };
    return this.http.post(`${this.baseUrl}/addseans`, body).pipe();
  }

  getPsikologSeans(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/psikologseans/${id}`).pipe();
  }

  balancePsikologAccount(balanceData: any, id: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/balancepsikologaccount`, {
      balanceData,
      id,
    });
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}/login`, body).pipe();
  }
}
