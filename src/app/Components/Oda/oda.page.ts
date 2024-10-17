import { UserService } from 'src/Service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-oda',
  templateUrl: 'oda.page.html',
  styleUrls: ['oda.page.scss'],
})
export class OdaPage implements OnInit {
  @ViewChild('odamodal', { static: false }) odamodal!: IonModal;
  selectedSegment: string = 'oda';
  serverpath: any = 'https://api.therapydays.com/static';
  type: any;
  oda: any;

  constructor(private UserService: UserService, private router: Router) {}

  openModal() {
    this.odamodal.present();
  }

  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    if (this.type == 'user') {
      this.UserService.getUserOda(Number(localStorage.getItem('id'))).subscribe(
        {
          next: (result: any) => {
            console.log(result);
            if (Array(result).length) {
              this.oda = result;
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
                      if (Array(result).length) {
                        this.oda = result;
                      }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  navigatePsikolog(id: any) {
    this.cancel(this.odamodal);
    const navigationExtras: NavigationExtras = {
      state: {
        free: true,
        id: this.oda[0].id
      },
    };
    this.router.navigate([`/psikolog/${id}`], navigationExtras);
  }

  cancel(modal: IonModal) {
    modal.dismiss(null, 'cancel');
  }
}
