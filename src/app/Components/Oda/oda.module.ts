import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OdaPage} from './oda.page';
import { OdaRoutingModule } from './oda-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OdaRoutingModule
  ],
  declarations: [OdaPage]
})
export class OdaModule {}
