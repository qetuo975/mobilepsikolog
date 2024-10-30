import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VeritfyPage} from './veritfy.page';
import { VeritfyRoutingModule } from './veritfy-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VeritfyRoutingModule,
  ],
  declarations: [VeritfyPage],
})
export class VeritfyModule {}
