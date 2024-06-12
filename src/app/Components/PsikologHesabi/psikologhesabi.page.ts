import { UserService } from './../../../Service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-psikologhesabi',
  templateUrl: 'psikologhesabi.page.html',
  styleUrls: ['psikologhesabi.page.scss'],
})
export class PsikologHesabiPage implements OnInit {
  @ViewChild('modal1', { static: false }) modal1!: IonModal;
  @ViewChild('modal2', { static: false }) modal2!: IonModal;
  @ViewChild('modal3', { static: false }) modal3!: IonModal;

  constructor(private UserService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
          this.UserService.getPsikolog(parseInt(id, 10)).subscribe({
            next: (result: any) => {
              console.log(result);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
        }
  }

  cancel(modal: IonModal) {
    modal.dismiss(null, 'cancel');
  }

  selectedTime: any;
  sessions: { date: string; startTime: string; endTime: string }[] = [
    { date: '2024-06-12', startTime: '09:00', endTime: '10:00' },
    { date: '2024-06-13', startTime: '14:00', endTime: '15:00' },
    { date: '2024-06-14', startTime: '11:00', endTime: '12:00' },
  ];
}
