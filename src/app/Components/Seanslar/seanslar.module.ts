import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeanslarPage } from './seanslar.page';

import { SeanslarPageRoutingModule } from './seanslar-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SeanslarPageRoutingModule,
  ],
  declarations: [SeanslarPage],
})
export class SeanslarModule {}
