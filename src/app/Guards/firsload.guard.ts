import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirstLoadGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isFirstLoad = localStorage.getItem('isFirstLoad');

    if (!isFirstLoad) {
      // İlk kez açılıyorsa yönlendir ve durumu kaydet
      localStorage.setItem('isFirstLoad', 'false');
      this.router.navigate(['/viewer']);
      return false;
    }

    // Daha önce açılmışsa devam et
    return true;
  }
}
