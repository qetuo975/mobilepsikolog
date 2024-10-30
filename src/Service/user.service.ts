import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = `${api}/user`;
  private general: string = `${api}/general`;

  constructor(private http: HttpClient) {}

  insertPuan(
    type: any,
    currentid: any,
    psikologid: any,
  ): Observable<any> {
    const body = { type, currentid, psikologid };
    return this.http.post(`${this.general}/insertpuan`, body).pipe();
  }

  getFilterPsikolog(
    cinsiyet: any,
    yas: any,
    kategori: any,
    fiyat: any
  ): Observable<any> {
    const body = { cinsiyet, yas, kategori, fiyat };
    return this.http.post(`${this.baseUrl}/filterpsikolog`, body).pipe();
  }

  getUserOda(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/odauser/` + id).pipe();
  }

  getPsikologOda(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/odapsikolog/` + id).pipe();
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


  registerTemp(email: string, password: string, type: string): Observable<any> {
    const body = { email, password, type };
    return this.http.post(`${this.baseUrl}/registerTemp`, body).pipe();
  }

  verify(email: string, verificationCode: string): Observable<any> {
    const body = { email, verificationCode };
    return this.http.post(`${this.baseUrl}/verify`, body).pipe();
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

  FreePsikologSeans(
    userid: number,
    psikologid: number,
    tarih: any,
    odaid: number
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/freepsikologseans`, {
      userid,
      psikologid,
      tarih,
      odaid,
    });
  }

  PsikologSeans(
    userid: number,
    psikologid: number,
    tarih: any,
    freeaccount: boolean = false
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/psikologseans`, {
      userid,
      psikologid,
      tarih,
      freeaccount,
    });
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}/login`, body).pipe();
  }
}
