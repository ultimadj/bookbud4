import {Component} from '@angular/core';
import {AngularFire} from 'angularfire2';

@Component({
  selector: 'app-root',
  template: `
<app-login-router-outlet></app-login-router-outlet>
<router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
