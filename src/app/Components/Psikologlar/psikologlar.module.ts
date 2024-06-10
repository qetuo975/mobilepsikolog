import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PsikologlarPage } from './psikologlar.page';

import { PsikologlarPageRoutingModule } from './psikologlar-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PsikologlarPageRoutingModule,
  ],
  declarations: [PsikologlarPage],
})
export class PsikologlarModule {}
