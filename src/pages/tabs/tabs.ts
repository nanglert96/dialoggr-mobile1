import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LogPage} from '../log/log';
import {TrendPage} from '../trend/trend';
import {AccountPage} from '../account/account';
import { AuthService } from '../../providers/auth-service/auth-service';
import { User } from '../../models/user';
import { EnterBGLPage } from '../enter-bgl/enter-bgl';
import { EnterSleepPage } from '../enter-sleep/enter-sleep';



/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = EnterBGLPage;
  tab2Root: any = LogPage;
  tab3Root: any = EnterSleepPage;
  tab4Root: any = TrendPage;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
