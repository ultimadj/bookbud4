import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2";
import {UserDetail} from "./user-details";
import {Observable} from "rxjs";

@Injectable()
export class UserService {
  currentUser : UserDetail;

  constructor(private af : AngularFireAuth) {}

  user() {
    return Observable.create((observer) => {
      this.af.subscribe((auth) => {
        if(auth) {
          this.currentUser = this.fromAuth(auth);
        } else {
          this.currentUser = null;
        }
        observer.next(this.currentUser);
      });
    });
  }

  private fromAuth(googleAuth) {
    return new UserDetail(googleAuth.google.uid, googleAuth.google.displayName, googleAuth.gooogle.email)
  }
}
