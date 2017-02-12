import { Component, OnInit } from '@angular/core';
import {AngularFire} from "angularfire2";
import {UserService} from "../user.service";

@Component({
  selector: 'app-login-router-outlet',
  templateUrl: './login-router-outlet.component.html',
  styleUrls: ['./login-router-outlet.component.css']
})
export class LoginRouterOutletComponent {
  display = {};

  constructor(private userService: UserService) {
    this.display = {loading: true};
    userService.user.subscribe((userDetail) => {
      if(userDetail) {
        this.display = {showLogout: true};
      } else {
        this.display = {showLogin: true};
      }
    });
  }

  login() {
    this.userService.login();
  }
  logout() {
    this.userService.logout();
  }
}
