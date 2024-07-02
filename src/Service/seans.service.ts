import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeansService {
  private baseUrl: string = 'https://therapydays.com/api/general';

  constructor(private http: HttpClient) {}

  getSeansUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/seansuser/${id}`).pipe();
  }

  getSeansPsikolog(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/seanspsikolog/${id}`).pipe();
  }

  deletePastSeans(seanslar: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/deletepastseans`, {
      seanslar,
    });
  }
}
