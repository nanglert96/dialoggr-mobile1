// THIS IS THE BGL PAGE

import { Component } from '@angular/core';
import { Entry } from '../../models/entry';
import { Api } from  '../../providers/api-service/api-service';
import { NavController, NavParams } from 'ionic-angular';
import { TrendPage } from '../trend/trend';
import { AccountPage } from '../account/account';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';
import { LogPage } from '../log/log';
import { Page2 } from '../page2/page2';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  tab1Root: any = Page1;
  tab2Root: any = LogPage;
  tab3Root: any = Page2;
  tab4Root: any = TrendPage;

  bglModel;
  entries: Entry[] = [];
  // myDate: number = new Date().getTimezoneOffset();
  myDate: String = new Date().toISOString();




  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public loadingCtrl: LoadingController,
    public api: Api) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogPage');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  createBglEntry(){
    let loader = this.loadingCtrl.create({content: "hang on a sec..."});
    loader.present();

    let entry: Entry = {
      user: this.auth.user.user_id,
      type: 'bgl',
      value: this.bglModel.valueOf('bglModel'), //.value,
      start: this.myDate
    };
    
    console.log(entry);
    this.api.createEntry(entry).subscribe(res => {
      console.log(res);
      loader.dismiss();
    });
  }

}
