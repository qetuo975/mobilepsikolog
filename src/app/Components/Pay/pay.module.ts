import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayPage } from './pay.page';
import { PayRoutingModule } from './pay-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PayRoutingModule,
  ],
  declarations: [PayPage],
})
export class PayModule {}
