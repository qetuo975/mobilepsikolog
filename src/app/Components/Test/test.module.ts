import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestPage} from './test.page';
import { TestRoutingModule } from './test-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TestRoutingModule
  ],
  declarations: [TestPage]
})
export class TestModule {}
