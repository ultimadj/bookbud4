import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  template: `
  <div> {{ (af.auth | async)?.uid }} </div>
  <button (click)="login()">Login</button>
  <button (click)="logout()">Logout</button>
  `,
})
export class AppComponent {
  constructor(public af: AngularFire) {
  }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
  }
}
