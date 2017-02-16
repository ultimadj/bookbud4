import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2";
import {Observable} from "rxjs";
import User = firebase.User;

@Injectable()
export class UserAwareDataService {
  uid:string;

  constructor(private afd: AngularFireDatabase, private us: UserService) {}

  userObject(context: string): Observable<FirebaseObjectObservable<any>> {
    return this.us.user.map((user:User) => {
      this.uid = user.uid;
      return this.afd.object(`/users/${this.uid}/${context}`, {preserveSnapshot: false});
    });
  }

  save(context: string, data:any) {
    this.afd.object(`/users/${this.uid}/${context}`).set(this.strip(data));
  }

  strip(context: any) {
    delete context.$key;
    delete context.$value;
    delete context.$exists;
    return context;
  }
}
