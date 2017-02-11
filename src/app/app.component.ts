import {Component} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {AuthGuardService} from "./auth-guard.service";

@Component({
  selector: 'app-root',
  template: `
<h1>App</h1>
<app-nav></app-nav>
<router-outlet></router-outlet>
  `,
})
export class AppComponent {
  /*
  More on the async pipe: https://angular.io/docs/ts/latest/api/common/index/AsyncPipe-pipe.html
   */
  constructor(public af: AngularFire, public authGuard: AuthGuardService) {
  }
}
