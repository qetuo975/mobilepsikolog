import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HesabimPage} from './hesabim.page';
import { HesabimRoutingModule } from './hesabim-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HesabimRoutingModule
  ],
  declarations: [HesabimPage]
})
export class HesabimModule {}
