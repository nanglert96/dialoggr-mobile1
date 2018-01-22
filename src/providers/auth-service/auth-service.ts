import { Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from '../../models/user';
import Auth0Lock from 'auth0-lock';
import Auth0 from 'auth0-js';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();
  auth0 = new Auth0({clientID: 'LvTu649MWjQoN8P9eDXqP9hudO9wS8VV', domain: 'dialoggr.auth0.com' });
  lock = new Auth0Lock('LvTu649MWjQoN8P9eDXqP9hudO9wS8VV', 'dialoggr.auth0.com', {
    auth: {
      redirect: false,
      params: {
        scope: 'openid offline_access',
      }
    }
  });

  refreshSubscription: any;
  user: User;
  zoneImpl: NgZone;
  idToken: string;

  constructor(
  	private authHttp: AuthHttp,
  	zone: NgZone,
    private storage: Storage) {

    this.zoneImpl = zone;
    // Check if there is a profile saved in local storage
    this.storage.get('profile').then(profile => {
      this.user = new User(JSON.parse(profile));
    }).catch(error => {
      console.log(error);
    });

    this.storage.get('id_token').then(token => {
      this.idToken = token;
    });

    this.lock.on('authenticated', authResult => {
      this.storage.set('id_token', authResult.idToken);
      this.idToken = authResult.idToken;

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        profile.user_metadata = profile.user_metadata || {};
        this.storage.set('profile', JSON.stringify(profile));
        this.user = new User(profile);
      });

      this.lock.hide();

      this.storage.set('refresh_token', authResult.refreshToken);
      this.zoneImpl.run(() => { this.user = new User(authResult.profile); });
      // Schedule a token refresh
      this.scheduleRefresh();

    });
  }

  public authenticated() {
    return tokenNotExpired('id_token', this.idToken);
  }

  public login() {
    // Show the Auth0 Lock widget
    this.lock.show();
  }

  public logout() {
    this.storage.remove('profile');
    this.storage.remove('id_token');
    this.idToken = null;
    this.storage.remove('refresh_token');
    this.zoneImpl.run(() => this.user = null);
    // Unschedule the token refresh
    this.unscheduleRefresh();
  }

  public scheduleRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token

    let source = Observable.of(this.idToken).flatMap(
      token => {
        console.log('token here', token);
        // The delay to generate in this case is the difference
        // between the expiry time and the issued at time
        let jwtIat = this.jwtHelper.decodeToken(token).iat;
        let jwtExp = this.jwtHelper.decodeToken(token).exp;
        let iat = new Date(0);
        let exp = new Date(0);

        let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));

        return Observable.interval(delay);
      });

    this.refreshSubscription = source.subscribe(() => {
      this.getNewJwt();
    });
  }

  public startupTokenRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    if (this.authenticated()) {
      let source = Observable.of(this.idToken).flatMap(
        token => {
          // Get the expiry time to generate
          // a delay in milliseconds
          let now: number = new Date().valueOf();
          let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
          let exp: Date = new Date(0);
          exp.setUTCSeconds(jwtExp);
          let delay: number = exp.valueOf() - now;

          // Use the delay in a timer to
          // run the refresh at the proper time
          return Observable.timer(delay);
        });

        // Once the delay time from above is
        // reached, get a new JWT and schedule
        // additional refreshes
        source.subscribe(() => {
          this.getNewJwt();
          this.scheduleRefresh();
        });
    }
  }

  public unscheduleRefresh() {
    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  public getNewJwt() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage
    this.storage.get('refresh_token').then(token => {
      this.auth0.refreshToken(token, (err, delegationRequest) => {
        if (err) {
          alert(err);
        }
        this.storage.set('id_token', delegationRequest.id_token);
        this.idToken = delegationRequest.id_token;
      });
    }).catch(error => {
      console.log(error);
    });
  }

  public updateUserMetadata(user_metadata: {}, merge: boolean = true): Observable<User> {
    // set the URL
    let url = 'https://dialoggr.auth0.com/api/v2/users/' + this.user.user_id;
    if(merge) {
      // merge the new data with the existing user_metadata and update this.user
      this.user.user_metadata = Object.assign(this.user.user_metadata, user_metadata);
    } else {
      // replace user.user_metadata with the value passed in
      this.user.user_metadata = Object.assign(user_metadata);
    }
    // set the body content for the request
    let body = {user_metadata: this.user.user_metadata};
    // send the request
    return this.authHttp.patch(url, body)
               .map((res: Response): User => res.json())
               .catch((err: any) => Observable.throw(err.json || 'Error Updating User Metadata'));
  }
}
