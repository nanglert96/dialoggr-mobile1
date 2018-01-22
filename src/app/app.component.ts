import { Component, ViewChild }    from '@angular/core';
import { Chart }                   from 'chart.js';
import { Nav, Platform }           from 'ionic-angular';
import { StatusBar }               from '@ionic-native/status-bar';
import { SplashScreen }            from '@ionic-native/splash-screen';
import { Storage }                 from '@ionic/storage';
import { LoadingController }       from 'ionic-angular';
import { EnterBGLPage }            from '../pages/enter-bgl/enter-bgl';
import { EnterSleepPage }          from '../pages/enter-sleep/enter-sleep';
import { BloodGlucosePage }        from '../pages/blood-glucose/blood-glucose';
import { SleepPage }               from '../pages/sleep/sleep';
import { FoodPage }                from '../pages/food/food';
import { SettingsPage }            from '../pages/settings/settings';
import { AuthService }             from '../providers/auth-service/auth-service';
import { FitBitService }           from '../providers/fitbit-service/fitbit-service';
import { Auth0Cordova }            from '@auth0/cordova';
import { Api }                     from '../providers/api-service/api-service'
import { TabsPage }                from '../pages/tabs/tabs';
import { TrendPage }               from '../pages/trend/trend';
import { AccountPage }             from '../pages/account/account';
import { PingPage }                from '../pages/ping/ping';

import { ProfilePage }             from '../pages/profile/profile';
import { IntroPage }               from '../pages/intro/intro';
import { LogPage }                 from '../pages/log/log';
import { StressPage }              from '../pages/stress/stress';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IntroPage

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    private auth: AuthService,
    private fitbit: FitBitService,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen)
     {

      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      // Schedule a token refresh on app start up
      auth.startupTokenRefresh();
      // Schedule FitBit token refresh on app startup
      fitbit.startupFitBitTokenRefresh();

      //this.initializeApp();
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: TabsPage },
      { title: 'Blood Glucose', component: BloodGlucosePage },
      { title: 'Food', component: FoodPage },
      { title: 'Sleep', component: SleepPage },
      { title: 'Stress', component: StressPage },
      { title: 'Account', component: AccountPage},
      { title: 'Settings', component: SettingsPage}           
    ];


  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get('introShown').then((result) => {

        if(result){
          this.rootPage = EnterBGLPage;
          console.log("go to EnterBGLPage");
        } else {
          this.rootPage = IntroPage;
          this.storage.set('introShown', true);
          console.log("go to walkthrough");
        }

        // this.loader.dismiss();

      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
