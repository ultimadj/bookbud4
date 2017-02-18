import { Component, OnInit } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginState: {};

  constructor(private af:AngularFire, private router:Router) {
    af.auth.subscribe((auth) => {
        if(auth) {
          this.loginState = {loggedIn: true};
          this.router.navigateByUrl("/books")
        } else {
          this.loginState = {loggedOut: true}
        }
    })
  }

  ngOnInit() {
  }
}
