import { Injectable }               from '@angular/core';
import { Http, Response, Headers }  from '@angular/http';
import { Observable }               from 'rxjs/Rx';
import { AuthService as Auth }      from '../auth-service/auth-service';
import { Storage }                  from '@ionic/storage';
import { Entry }                    from '../../models/entry';
import { User }                     from '../../models/user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Api {

  private api_url: string;
  data: any;

  constructor(private auth: Auth, private http: Http, private storage: Storage) {
    this.api_url = 'http://192.168.33.10:8080';
  }

  // create a function to get data from our API
  get(path: string = "", type: string): Observable<any> {
    // is this person logged in?
    if(this.auth.authenticated()) {
      // get the JWT
      let token = this.auth.idToken;

      // get the user's ID from their profile
      let user: User = this.auth.user;

      let userId = user.identities[0].user_id;

      // set up the query string
      let qs = `?user=${userId}&type=${type}`;

      // set the Authorization and Content-Type headers
      let headers = new Headers();
      headers.set('Authorization', `Bearer ${token}`);

      // fetch the result
      return this.http.get(this.api_url + path + qs, {headers: headers})
                      .map((res: Response): any => res.json())
                      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    } else {
      return Observable.throw("Not logged in");
    }
  }


  createEntry(entry: Entry): Observable<Entry> {

    if(this.auth.authenticated()) {
      let headers = new Headers({
        'Authorization': `Bearer ${this.auth.idToken}`
      });

      return this.http.post(this.api_url + '/entries', entry, {headers:headers})
        .map((res: Response) => res.json())
        .catch((err:any) => Observable.throw(err.json()));

    }
  }
}
