import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AuthService } from '../../providers/auth-service/auth-service';
/*
  Generated class for the Stress page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stress',
  templateUrl: 'stress.html'
})
export class StressPage {

 @ViewChild('lineCanvas') lineCanvas;
 lineChart: any;
  myDate: String = new Date().toISOString();


  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public auth: AuthService) {}


  ionViewDidLoad() {
  
     this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels:["4/15/17", "4/16/17", "4/17/17", "4/18/17", "4/19/17", "4/20/17", "4/21/17"],
                datasets: [
                    {
                        label: "Stress Levels",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [1, 1, 3, 0, 0, 3, 1],
                        spanGaps: false,
                    }
                ]
            }
            , options: {
                        legend: {
                          position: 'bottom'}
 
        }});
}
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }
}
