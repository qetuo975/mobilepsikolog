import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PsikologService {
  private baseUrl: string = 'https://therapydays.com/api/general';
  private psikolog: string = 'https://therapydays.com/api/user';

  constructor(private http: HttpClient) {}

  getPsikologs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/psikologsall`).pipe();
  }

  getKategori(): Observable<any> {
    return this.http.get(`${this.baseUrl}/psikologkategori`).pipe();
  }

  getSearch(psikologname: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/getsearch?query=${psikologname}`)
      .pipe();
  }

  filterpsikolog(formdata: any): Observable<any> {
    const body = { formdata };
    return this.http.post(`${this.psikolog}/filterpsikolog`, body).pipe();
  }
}
