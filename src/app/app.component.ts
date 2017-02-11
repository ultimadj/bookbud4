import {Component} from '@angular/core';
import {AngularFire} from 'angularfire2';

@Component({
  selector: 'app-root',
  template: `
<div *ngIf="(af.auth | async)?.uid">
  <div> {{ (af.auth | async)?.uid }} </div>
  <button (click)="logout()">Logout</button>
</div>
<div *ngIf="!(af.auth | async)?.uid">
  <button (click)="login()">Login</button>
</div>
  `,
})
export class AppComponent {
  /*
  More on the async pipe: https://angular.io/docs/ts/latest/api/common/index/AsyncPipe-pipe.html
   */
  constructor(public af: AngularFire) {
  }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
  }
}
