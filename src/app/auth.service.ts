import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";

@Injectable()
export class AuthService {
  loggedIn: boolean;
  constructor(public af:AngularFire) {
    this.loggedIn = false;
    af.auth.subscribe(auth => {
      if(auth) {
        console.log('logged in', auth);
        this.loggedIn = true;
      } else {
        console.log('not logged in');
        this.loggedIn = false;
      }
    });
  }
}
