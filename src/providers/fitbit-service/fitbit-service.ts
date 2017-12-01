import { Injectable, NgZone } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Platform } from 'ionic-angular';
import { InAppBrowser, InAppBrowserEvent } from 'ionic-native';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Moment } from 'moment';
import { AuthService } from './auth-service/auth-service';
import { User } from '../models/user';


export interface FitBitAccessToken {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  token_type: string,
  user_id: string
}

export interface FitBitProfile {
  user: {
    aboutMe: string,
    avatar: string,
    avatar150: string,
    city: string,
    clockTimeDisplayFormat: string,
    country: string,
    dateOfBirth: string,
    displayName: string,
    distanceUnit: string,
    encodedId: string,
    foodsLocale: string,
    fullName: string,
    gender: string,
    glucoseUnit: string,
    height: number,
    heightUnit: string,
    locale: string,
    memberSince: string,
    nickname: string,
    offsetFromUTCMillis: string,
    startDayOfWeek: string,
    state: string,
    strideLengthRunning: number,
    strideLengthWalking: number,
    timezone: string,
    waterUnit: string,
    weight: number,
    weightUnit: string
  };
}

export interface FitBitSleepResponse {
  pagination: {
    beforeDate?: string,
    afterDate?: string,
    limit: number,
    next: string,
    offset: number,
    previous: string,
    sort: string
  },
  sleep: FitBitSleep[]
}

export interface FitBitSleep {
  dateOfSleep: string,
  duration: number,
  efficiency: string,
  isMainSleep?: boolean,
  levels: {
    summary: {
      deep?: {
        count: number,
        minutes: number,
        thirtyDayAvgMinutes: number
      },
      light?: {
        count: number,
        minutes: number,
        thirtyDayAvgMinutes: number
      },
      rem?: {
        count: number,
        minutes: number,
        thirtyDayAvgMinutes: number
      },
      wake?: {
        count: number,
        minutes: number,
        thirtyDayAvgMinutes: number
      },
      asleep?: {
        count: number,
        minutes: number
      },
      awake?: {
        count: number,
        minutes: number
      },
      restless?: {
        count: number,
        minutes: number
      }
    },
    data: [{
      datetime: Date,
      level: string,
      seconds: number
    }],
    shortData?: [{
      datetime: Date,
      level: string,
      seconds: number
    }]
  },
  logId: string,
  minutesAfterWakeup: number,
  minutesAsleep: number,
  minutesAwake: number,
  minutesToFallAsleep: number,
  startTime: Date,
  timeInBed: number,
  type: string
}

@Injectable()
export class FitBitService {

  private helper: JwtHelper = new JwtHelper();
  private auth_url: string;
  private token_url: string;
  private client_id: string;
  private secret: string;
  private basic: string;
  private scope: string[];
  private access_token: string;
  private refresh_token: string;
  private user_id: string;
  private refreshSubscription: any;
  private browser: InAppBrowser;

  constructor(public http: Http, public platform: Platform, public zone: NgZone, public auth: AuthService) {

    // provide values for connecting to the FitBit API
    this.auth_url  = 'https://www.fitbit.com/oauth2/authorize?';
    this.token_url = 'https://api.fitbit.com/oauth2/token';
    this.client_id = "2289BC";
    this.secret    = "1c60daa5b4103c80039383279e0e0485";
    this.basic     = "Basic " + btoa(this.client_id + ':' + this.secret);
    this.scope     = [ 'profile', 'sleep' ];

    // check to see if we've registered a FitBit
    if(this.auth.user && this.auth.user.user_metadata.devices.FitBit) {
      this.access_token  = this.auth.user.user_metadata.devices.FitBit.access_token;
      this.refresh_token = this.auth.user.user_metadata.devices.FitBit.refresh_token;
    }
  }

  register(): Observable<User> {
    return Observable.fromPromise(this.platform.ready()).flatMap(() => {
      let url = this.auth_url;
      url += `client_id=${this.client_id}&`;
      url += 'response_type=code&';
      url += 'scope=' + this.scope.join('%20');
      this.browser = new InAppBrowser(url, '_blank', 'location=yes');
      return this.browser.on('loadstart');
    }).flatMap((ev: InAppBrowserEvent) => {
      if (ev.url.indexOf('https://api.dialoggr.com/fitbit') === 0) {
        let code = ev.url.match(/code=(.*?)#_=_/);
        this.browser.close();
        return this.getAccessToken(code[1]);
      }
    }).flatMap((tokens: FitBitAccessToken) => {
      this.access_token  = tokens.access_token;
      this.refresh_token = tokens.refresh_token;
      this.user_id = tokens.user_id;
      this.scheduleRefresh();
      return this.auth.updateUserMetadata({ devices: { FitBit: tokens } });
    });
  }

  unregister(): Observable<User> {
    let replace = true;
    this.access_token  = null;
    this.refresh_token = null;
    this.user_id = null;
    this.unscheduleRefresh();
    let metadata = Object.assign(this.auth.user.user_metadata);
    delete metadata.devices['FitBit'];
    return this.auth.updateUserMetadata(metadata, replace);
  }

  fitbitAccessTokenNotExpired(): boolean {
    let token = this.access_token;
    return token && !this.helper.isTokenExpired(token);
  }

  getAccessToken(code: string): Observable<FitBitAccessToken> {
    let headers = new Headers({
      'Authorization': this.basic,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let body = `client_id=${this.client_id}&grant_type=authorization_code&code=${code}`;

    return this.http.post(this.token_url, body, {headers: headers})
               .map((res: Response): FitBitAccessToken => res.json())
               .catch((err: any) => Observable.throw(err.json().error || 'Server error'));
  }

  startupFitBitTokenRefresh() {
    // if we have a valid FitBit access token
    if(this.access_token) {
      // set up a timer that will fire when it expires
      let timer = Observable.of(this.access_token).flatMap((token: string): Observable<{}> => {
        let now = new Date().valueOf();
        let jwt_expires_at = this.helper.decodeToken(token).exp;
        let exp = new Date(0);
        let delay = exp.setUTCSeconds(jwt_expires_at) - now;
        return Observable.timer(delay);
      });
      // subscribe to the timer events
      timer.subscribe(() => {
        this.refresh().subscribe((tokens: FitBitAccessToken) => {
          this.access_token  = tokens.access_token;
          this.refresh_token = tokens.refresh_token;
          this.user_id = tokens.user_id;
          this.auth.updateUserMetadata({
            devices: {
              FitBit: tokens
            }
          });
        });
        this.scheduleRefresh();
      });
    }
  }

  scheduleRefresh() {
    // set up a timer that will fire when the FitBit access token is going to expire
    let timer = Observable.of(this.access_token).flatMap((token: string): Observable<{}> => {
      let jwt_issued_at = this.helper.decodeToken(token).iat;
      let jwt_expiry_at = this.helper.decodeToken(token).exp;
      let iat = new Date(0);
      let exp = new Date(0);
      let delay = exp.setUTCSeconds(jwt_expiry_at) - iat.setUTCSeconds(jwt_issued_at);
      return Observable.interval(delay);
    });
    // make the refreshSubscription use the timer
    this.refreshSubscription = timer.subscribe(() => {
      this.refresh().subscribe((tokens: FitBitAccessToken) => {
        this.access_token  = tokens.access_token;
        this.refresh_token = tokens.refresh_token;
        this.user_id = tokens.user_id;
        this.auth.updateUserMetadata({
          devices: {
            FitBit: tokens
          }
        });
      });
    });
  }

  unscheduleRefresh() {
    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  /**
   * Returns an Observable that resolves to a FitBitAccessToken object
   * @return {Observable<FitBitAccessToken>} An object that contains refresh and access tokens for the FitBit API
   */
  refresh(): Observable<FitBitAccessToken> {
    let headers = new Headers({
      'Authorization': this.basic,
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let body = `grant_type=refresh_token&refresh_token=${this.refresh_token}`;
    return this.http.post(this.token_url, body, {headers: headers})
               .map((res: Response): FitBitAccessToken => res.json())
               .catch((err: any) => Observable.throw(err.json() || 'Token Refresh Error'));
  }

  /**
   * Gets the 10 "sleeps" prior to now, most recent first
   * @return {Observable<FitBitSleep[]>} An array of FitBitSleep objects
   */
  getSleep(): Observable<FitBitSleep[]> {
    let now = new Date().toJSON().slice(0,10);
    let url = `https://api.fitbit.com/1.2/user/${this.user_id}/sleep/list.json?sort=desc&offset=0&limit=10&beforeDate=${now}`;
    let headers = new Headers({
      'Authorization': `Bearer ${this.access_token}`
    });
    return this.http.get(url, {headers: headers})
               .map((res: Response) => res.json().sleep)
               .catch((err: any) => Observable.throw(err.json() || 'Get Sleep Error'));
  }
}

