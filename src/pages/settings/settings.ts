import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LogPage } from '../log/log';
import { TabsPage } from '../tabs/tabs';
import { ActionSheetController } from 'ionic-angular';
import { FitBitService } from '../../providers/fitbit-service/fitbit-service';
import { User } from '../../models/user';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  items:any;
  devices: string[] = [];
  //private registered: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public fitbit: FitBitService,
    public auth: AuthService
  ) {
    this.storage.get('myStore').then((data) => {
      this.items = data;
      console.log(data);
    });
    //this.registered = false;
  };

  ionViewDidLoad() {
    if('undefined' !== typeof this.auth.user.user_metadata && 'undefined' !== typeof this.auth.user.user_metadata.devices) {
      this.devices = Object.keys(this.auth.user.user_metadata.devices);
    }
    console.log('ionViewDidLoad SettingsPage');
  }

  save(val){
    console.log('data added' +val);
    this.storage.get('myStore').then((data) => {
      if(data !=null)
      {
        data.push(val);
        this.storage.set('myStore', data);
      }
      else
      {
        let array = [];
        array.push(val);
        this.storage.set('myStore', array);
      }
    });
  };

  deviceType() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Device Type',
      buttons: [
        {
          text: 'FitBit',
          handler: () => {
            let loader = this.loadingCtrl.create({
              content: "Registering FitBit..."
            });
            loader.present();
            this.fitbit.register().subscribe((user: User) => {
              if('undefined' !== typeof user.user_metadata.devices) {
                this.devices = Object.keys(user.user_metadata.devices);
              }
              loader.dismiss();
            });
          }
        },{
          text: 'Other',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  unregister(device: string) {
    switch(device) {
      case 'FitBit':
        let loader = this.loadingCtrl.create({
          content: "Unregistering FitBit..."
        });
        loader.present();
        this.fitbit.unregister().subscribe((user: User) => {
          if('undefined' !== typeof user.user_metadata.devices) {
            this.devices = Object.keys(user.user_metadata.devices);
          } else {
            this.devices = [];
          }
          loader.dismiss();
        });
        break;
    }
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  logout(){
    this.navCtrl.setRoot(TabsPage);
  }
}