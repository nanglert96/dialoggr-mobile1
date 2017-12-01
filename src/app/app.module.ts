import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FitBitService } from '../providers/fitbit-service/fitbit-service';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { BloodGlucosePage } from '../pages/blood-glucose/blood-glucose';
import { SleepPage } from '../pages/sleep/sleep';
import { FoodPage } from '../pages/food/food';
import { AuthService } from '../providers/auth-service/auth-service';
import { Api } from '../providers/api-service/api-service'
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { TrendPage } from '../pages/trend/trend';
import { AccountPage } from '../pages/account/account';
import { PingPage } from '../pages/ping/ping';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { ProfilePage } from '../pages/profile/profile';
import { IntroPage } from '../pages/intro/intro';
import { LogPage } from '../pages/log/log';
import { StressPage } from '../pages/stress/stress';
import { MillisecondsToHoursPipe } from '../pipes/milliseconds-to-hours';

let storage: Storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    BloodGlucosePage,
    SleepPage,
    FoodPage,
    SettingsPage,
    ProfilePage,
    IntroPage,
    TabsPage,
    TrendPage,
    AccountPage,
    PingPage,
    LogPage,
    StressPage,
    MillisecondsToHoursPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    BloodGlucosePage,
    SleepPage,
    FoodPage,
    SettingsPage,
    ProfilePage,
    IntroPage,
    TabsPage,
    TrendPage,
    AccountPage,
    PingPage,
    LogPage,
    StressPage

  ],
  providers: [
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    Storage,
    Api,
    FitBitService
  ]
})
export class AppModule {}
