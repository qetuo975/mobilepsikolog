import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
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
    HesabimRoutingModule
  ],
  declarations: [HesabimPage]
})
export class HesabimModule {}
