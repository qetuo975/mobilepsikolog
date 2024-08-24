import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HesabimPage} from './hesabim.page';
import { HesabimRoutingModule } from './hesabim-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HesabimRoutingModule,
  ],
  declarations: [HesabimPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HesabimModule {}
