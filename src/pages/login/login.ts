
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TrendPage } from '../trend/trend';
import { AccountPage } from '../account/account';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  templateUrl: 'login.html'
})

export class LoginPage {

  tab1Root: any = LoginPage;
  tab2Root: any = TrendPage;
  tab3Root: any = AccountPage;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public auth: AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

