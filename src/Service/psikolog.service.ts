import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PsikologService {
  private baseUrl: string = 'http://localhost:4000/api/general';
  private psikolog: string = 'http://localhost:4000/api/user';

  constructor(private http: HttpClient) {}

  getPsikologs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/psikologsall`).pipe();
  }

  getKategori(): Observable<any> {
    return this.http.get(`${this.baseUrl}/psikologkategori`).pipe();
  }

  filterpsikolog(formdata: any): Observable<any> {
    const body = { formdata };
    return this.http.post(`${this.psikolog}/filterpsikolog`, body).pipe();
  }
}
