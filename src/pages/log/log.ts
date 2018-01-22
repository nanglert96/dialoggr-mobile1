// THIS IS THE CARB PAGE
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TrendPage } from '../trend/trend';
import { AccountPage } from '../account/account';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';
import { Entry } from '../../models/entry';
import { Api } from  '../../providers/api-service/api-service';
import { EnterBGLPage } from '../enter-bgl/enter-bgl';
import { EnterSleepPage } from '../enter-sleep/enter-sleep';


@Component({
  selector: 'page-log',
  templateUrl: 'log.html'
})
export class LogPage {

  tab1Root: any = EnterBGLPage;
  tab2Root: any = LogPage;
  tab3Root: any = EnterSleepPage;
  tab4Root: any = TrendPage;

  carbsModel;
  entries: Entry[] = [];
  myDate: Date = new Date();


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
