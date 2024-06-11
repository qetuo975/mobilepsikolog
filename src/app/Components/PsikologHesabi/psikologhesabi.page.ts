import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-psikologhesabi',
  templateUrl: 'psikologhesabi.page.html',
  styleUrls: ['psikologhesabi.page.scss'],
})
export class PsikologHesabiPage {
  @ViewChild('modal1', { static: false }) modal1!: IonModal;
  @ViewChild('modal2', { static: false }) modal2!: IonModal;
  @ViewChild('modal3', { static: false }) modal3!: IonModal;

  constructor() {}

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
