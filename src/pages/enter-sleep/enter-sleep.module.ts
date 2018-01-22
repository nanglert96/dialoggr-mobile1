import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnterSleepPage } from './enter-sleep';

@NgModule({
  declarations: [
    EnterSleepPage,
  ],
  imports: [
    IonicPageModule.forChild(EnterSleepPage),
  ],
})
export class EnterSleepPageModule {}
