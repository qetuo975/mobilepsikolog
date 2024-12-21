import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusPage } from './status.page';
import { StatusRoutingModule } from './status-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    StatusRoutingModule,
  ],
  declarations: [StatusPage],
})
export class StatusModule {}
