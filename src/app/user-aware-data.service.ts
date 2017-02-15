import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2";
import {Observable} from "rxjs";

@Injectable()
export class UserAwareDataService {
  dataReady:boolean;
  readiness:Observable<boolean>;

  constructor(private afd: AngularFireDatabase, private us: UserService) {
    this.dataReady = us.currentUser != null;
    this.readiness = Observable.create((observer) => {
      us.user.subscribe((user) => {
        this.dataReady = us.currentUser != null;
        observer.next(this.dataReady);
      });
    });
  }

  userObject(context: string): FirebaseObjectObservable<any> {
    if(!this.dataReady) {
      console.log("Data requested before available.");
    }
    return this.afd.object(`/users/${this.us.currentUser.uid}/${context}`);
  }

  // queueIsbnRequest(isbn: string): FirebaseObjectObservable<any> {
  //   if(!this.dataReady) {
  //     console.log("Not ready: queueIsbnRequest");
  //   }
  //   let path = `/queue/isbnRequest/${this.us.currentUser.uid}/${isbn}`;
  //   console.log("queued isbn request to: " + path);
  //   this.afd.object(path).set({user: this.us.currentUser.uid, isbn: isbn});
  //   return this.afd.object(`/isbn/${isbn}`);
  // }
}
