import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PsikologService {
  private baseUrl: string = 'http://localhost:4000/api/general';

  constructor(private http: HttpClient) {}

  getPsikologs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/psikologsall`).pipe();
  }
}
