import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TerapistPage } from './terapist.page';
import { TerapistPageRoutingModule } from './terapist.routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TerapistPageRoutingModule
  ],
  declarations: [TerapistPage]
})
export class TerapistPageModule {}
