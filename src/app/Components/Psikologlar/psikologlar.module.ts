import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PsikologlarPage } from './psikologlar.page';
import { PsikologlarRoutingModule } from './psikologlar-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PsikologlarRoutingModule
  ],
  declarations: [PsikologlarPage]
})
export class PsikologlarModule {}
