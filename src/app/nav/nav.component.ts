import { Component, OnInit } from '@angular/core';
import {AngularFire} from "angularfire2";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(public af: AngularFire) {
  }

  logout() {
    this.af.auth.logout();
  }
}
