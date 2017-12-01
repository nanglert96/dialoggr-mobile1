import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LogPage} from '../log/log';
import {TrendPage} from '../trend/trend';
import {AccountPage} from '../account/account';
import { AuthService } from '../../providers/auth-service/auth-service';
import { User } from '../models/user';
import { Page1 } from '../page1/page1';
import { Page2 } from '../page2/page2';



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
  tab1Root: any = Page1;
  tab2Root: any = LogPage;
  tab3Root: any = Page2;
  tab4Root: any = TrendPage;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
