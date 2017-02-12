import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2";
import {Observable} from "rxjs";
import User = firebase.User;

@Injectable()
export class UserService {
  currentUser : User;
  user : Observable<User>;

  constructor(private af : AngularFireAuth) {
    this.user = Observable.create((observer) => {
      this.af.subscribe((authState) => {
        if(authState) {
          this.currentUser = authState.auth;
          console.log('logged in', this.currentUser);
        } else {
          this.currentUser = null;
          console.log('not logged in.');
        }
        observer.next(this.currentUser);
      });
    });
  }

  public login() {
    this.af.login();
  }
  public logout() {
    this.af.logout();
  }
}
