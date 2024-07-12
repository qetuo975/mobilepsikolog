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
  type: any;
  oda: any;

  constructor(private UserService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    if (this.type == 'user') {
      this.UserService.getUserOda(Number(localStorage.getItem('id'))).subscribe(
        {
          next: (result: any) => {
            this.oda = result;
            console.log(result);
          },
          error: (err: any) => {
            console.log(err);
          },
        }
      );
    } else {
    }
  }

  navigatePsikolog(id: any) {
    this.cancel(this.odamodal);
        const navigationExtras: NavigationExtras = {
          state: {
            free: true
          },
        };
    this.router.navigate([`/psikolog/${id}`], navigationExtras);
  }

  cancel(modal: IonModal) {
    modal.dismiss(null, 'cancel');
  }
}
