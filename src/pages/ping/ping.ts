import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/map';

/*
  Generated class for the Ping page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'ping.html'
})

export class PingPage {
  message: string;
  error: string;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private http: Http, 
  	private authHttp: AuthHttp, 
  	public auth: AuthService) {}

   ping() {
    // Change the endpoint up for
    // one that points to your own server.
    this.http.get('http://localhost:8100/')
      .map(res => res.json())
      .subscribe(
        data => this.message = data.text,
        err => this.error = err
      );
  }
  
  securedPing() {
    // Here we use authHttp to make an authenticated
    // request to the server. Change the endpoint up for
    // one that points to your own server.
    this.authHttp.get('http://localhost:3001/secured/ping')
      .map(res => res.json())
      .subscribe(
        data => this.message = data.text,
        err => this.error = err
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PingPage');
  }

}
