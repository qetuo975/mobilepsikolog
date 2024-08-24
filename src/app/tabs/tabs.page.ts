import { UserService } from './../../Service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  type: any;
  visibleoda: boolean = false;

  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    this.type = localStorage.getItem('type');

    if (this.type === 'user') {
      this.UserService.getUserOda(Number(localStorage.getItem('id'))).subscribe(
        {
          next: (result: any) => {
            console.log(result);
            // Eğer result bir dizi ise
            if (result && result.length > 0) {
              this.visibleoda = true;
            }
          },
          error: (err: any) => {
            console.log(err);
          },
        }
      );
    } else {
      this.UserService.getPsikologOda(
        Number(localStorage.getItem('id'))
      ).subscribe({
        next: (result: any) => {
          console.log(result);
          // Eğer result bir dizi ise
          if (result && result.length > 0) {
            this.visibleoda = true;
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
