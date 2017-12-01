import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Page1 } from '../page1/page1';

/*
  Generated class for the Intro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  sliderOptions: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {

    this.sliderOptions = {
      pager: true
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  public goToLogin(){
    this.navCtrl.setRoot(TabsPage);
  }

}
