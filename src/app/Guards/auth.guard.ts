import { CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserService } from 'src/Service/user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: any, state: any): Observable<boolean> {
    const type = localStorage.getItem('type');
    if (type) {
      const id = localStorage.getItem('id');
      console.log(type, id);

      if (type == 'psikolog') {
        return this.userService.getPsikolog(Number(id)).pipe(
          tap((result: any) => {
            if (result) {
              return of(true);
            } else {
              this.router.navigate(['/login']);
              return of(false);
            }
          }),
          catchError((err: any) => {
            console.log(err);
            this.router.navigate(['/login']);
            return of(false);
          })
        );
      } else {
        return this.userService.getUser(Number(id)).pipe(
          tap((result: any) => {
            console.log(result);
            if (result) {
              return of(true);
            } else {
              this.router.navigate(['/login']);
              return of(false);
            }
          }),
          catchError((err: any) => {
            console.log(err);
            this.router.navigate(['/login']);
            return of(false);
          })
        );
      }
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
