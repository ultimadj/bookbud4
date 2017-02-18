import {Directive, OnDestroy} from '@angular/core';
import { Router } from "@angular/router";
import {AngularFire} from "angularfire2";

// About: http://stackoverflow.com/questions/34331478/angular2-redirect-to-login-page
@Directive({
  selector: '[appProtected]'
})
export class ProtectedDirective implements OnDestroy {
  private sub:any = null;

  constructor(private af:AngularFire, private router:Router) {
    this.sub = af.auth.subscribe((auth) => {
      if (!auth || !auth.uid) {
        console.log("Missing UID. Redirect to /login...");
        this.router.navigateByUrl("/login");
      }
    });
  }
  ngOnDestroy() {
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }
}
