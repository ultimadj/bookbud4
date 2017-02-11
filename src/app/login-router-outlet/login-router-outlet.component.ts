import { Component, OnInit } from '@angular/core';
import {AngularFire} from "angularfire2";

@Component({
  selector: 'app-login-router-outlet',
  templateUrl: './login-router-outlet.component.html',
  styleUrls: ['./login-router-outlet.component.css']
})
export class LoginRouterOutletComponent {
  display = {};

  constructor(public af: AngularFire) {
    this.display = {loading: true};
    af.auth.subscribe(auth => {
      if(auth) {
        console.log('logged in', auth);
        this.display = {showLogout: true};
      } else {
        console.log('not logged in');
        this.display = {showLogin: true};
      }
    });
  }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
  }

}
