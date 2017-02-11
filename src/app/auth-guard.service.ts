import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2";

@Injectable()
export class AuthGuardService {

  constructor(private af: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return Observable.from(this.af)
      .take(1)
      .map(state => !!state)
      .do(authenticated => {
        if (!authenticated) this.router.navigate([ '/login' ]);
      });
  }

}
