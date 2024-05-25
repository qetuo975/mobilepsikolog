import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-hesabim',
  templateUrl: 'hesabim.page.html',
  styleUrls: ['hesabim.page.scss'],
})
export class HesabimPage {
  @ViewChild(IonModal) modal!: IonModal;

  constructor() {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
