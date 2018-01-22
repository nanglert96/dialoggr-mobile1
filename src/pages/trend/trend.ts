import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LogPage } from '../log/log';
import { AccountPage } from '../account/account';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';

/*
  Generated class for the Trend page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-trend',
  templateUrl: 'trend.html'
})
export class TrendPage {

    @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;
 
    barChart: any;
    doughnutChart: any;
    lineChart: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public auth: AuthService,
    public loadingCtrl: LoadingController) {}


  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }
    ionViewDidLoad() {
 
        // this.barChart = new Chart(this.barCanvas.nativeElement, {
 
        //     type: 'bar',
        //     data: {
        //         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        //         datasets: [{
        //             label: ' Label ',
        //             data: [12, 19, 3, 5, 2, 3],
        //             backgroundColor: [
        //                 'rgba(255, 99, 132, 0.2)',
        //                 'rgba(54, 162, 235, 0.2)',
        //                 'rgba(255, 206, 86, 0.2)',
        //                 'rgba(75, 192, 192, 0.2)',
        //                 'rgba(153, 102, 255, 0.2)',
        //                 'rgba(255, 159, 64, 0.2)'
        //             ],
        //             borderColor: [
        //                 'rgba(255,99,132,1)',
        //                 'rgba(54, 162, 235, 1)',
        //                 'rgba(255, 206, 86, 1)',
        //                 'rgba(75, 192, 192, 1)',
        //                 'rgba(153, 102, 255, 1)',
        //                 'rgba(255, 159, 64, 1)'
        //             ],
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         scales: {
        //             yAxes: [{
        //                 ticks: {
        //                     beginAtZero:true
        //                 }
        //             }]
        //         }
        //     }
 
        // });
 
        // this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
        //     type: 'doughnut',
        //     data: {
        //         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        //         datasets: [{
        //             label: 'Label',
        //             data: [12, 19, 3, 5, 2, 3],
        //             backgroundColor: [
        //                 'rgba(255, 99, 132, 0.2)',
        //                 'rgba(54, 162, 235, 0.2)',
        //                 'rgba(255, 206, 86, 0.2)',
        //                 'rgba(75, 192, 192, 0.2)',
        //                 'rgba(153, 102, 255, 0.2)',
        //                 'rgba(255, 159, 64, 0.2)'
        //             ],
        //             hoverBackgroundColor: [
        //                 "#FF6384",
        //                 "#36A2EB",
        //                 "#FFCE56",
        //                 "#FF6384",
        //                 "#36A2EB",
        //                 "#FFCE56"
        //             ]
        //         }]
        //     }
 
        // });
 
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: ["4/15/17", "4/16/17", "4/17/17", "4/18/17", "4/19/17", "4/20/17", "4/21/17"],
                datasets: [
                    {
                        label: " Blood Glucose Levels ",
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
                        data: [165, 159, 280, 181, 356, 255, 140],
                        spanGaps: false,
                    },
                    {
                        label: "Total Carbs",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255,99,132,1)",
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
                        data: [165, 159, 230, 100, 120, 200, 180],
                        spanGaps: false,
                    },
                    {
                        label: "Hours of Sleep",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        borderColor: "rgba(54, 162, 235, 1)",
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
                        data: [8, 7, 6.5, 8, 9, 12, 6],
                        spanGaps: false,
                    },
                    {
                        label: "Stress Levels",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255, 159, 64, 0.2)",
                        borderColor: "rgba(255, 159, 64, 1)",
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
 
        }
    });
 
    }
 
 
}
