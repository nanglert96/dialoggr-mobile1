import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StressPage } from './stress';

@NgModule({
  declarations: [
    StressPage,
  ],
  imports: [
    IonicPageModule.forChild(StressPage),
  ],
})
export class StressPageModule {}
