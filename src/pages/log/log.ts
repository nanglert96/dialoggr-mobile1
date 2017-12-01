// THIS IS THE CARB PAGE
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TrendPage } from '../trend/trend';
import { AccountPage } from '../account/account';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';
import { Entry } from '../../models/entry';
import { Api } from  '../../providers/api-service/api-service';
import { Page1 } from '../page1/page1';
import { Page2 } from '../page2/page2';


@Component({
  selector: 'page-log',
  templateUrl: 'log.html'
})
export class LogPage {

  tab1Root: any = Page1;
  tab2Root: any = LogPage;
  tab3Root: any = Page2;
  tab4Root: any = TrendPage;

  carbsModel;
  entries: Entry[] = [];
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

  createCarbsEntry(){
    let loader = this.loadingCtrl.create({content: "hang on a sec..."});
    loader.present();
    console.log("carb entry: ", this.carbsModel.valueOf('carbsModel'));
    let entry: Entry = {
      user: this.auth.user.user_id,
      type: 'carbs',
      value: this.carbsModel.valueOf('carbsModel'),
      start: this.myDate
    };

    this.api.createEntry(entry).subscribe(res => {
      console.log(res);
      loader.dismiss();
    });
  }

}
