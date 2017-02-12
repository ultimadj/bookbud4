import { Component, OnInit } from '@angular/core';
import {AngularFire} from "angularfire2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginState: {};

  constructor(private af:AngularFire) {
    af.auth.subscribe((auth) => {
        if(auth) {
          this.loginState = {loggedIn: true}
        } else {
          this.loginState = {loggedOut: true}
        }
    })
  }

  ngOnInit() {
  }
}
