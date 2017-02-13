import {Component} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  display = {};

  constructor(public userService: UserService) {
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
