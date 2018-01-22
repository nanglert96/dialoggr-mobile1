import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LogPage } from '../log/log';
import { TrendPage } from '../trend/trend';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public auth: AuthService,
    public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

}