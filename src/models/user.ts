import {Api} from '../providers/api-service/api-service';


export class User {
  user_metadata: {
    devices: {
      FitBit: {
        "access_token": string,
        "expires_in": number,
        "refresh_token": string,
        "token_type": string,
        "user_id": string
      }
    }
  };
  app_metadata: Object;
  updated_at: Date;
  picture: string;
  user_id: string;
  identities: [{
    "user_id": string,
    "provider": string,
    "connection": string,
    "isSocial": boolean
  }];
  created_at: Date;
  last_ip: string;
  last_login: Date;
  logins_count: number;
  blocked_for: Object[];

  constructor(props: Object) {
    for(let key in props) {
      this[key] = props[key];
    }
  }
}


