import {Directive, OnDestroy} from '@angular/core';
import { Router } from "@angular/router";
import {AuthService} from "./auth.service";

// About: http://stackoverflow.com/questions/34331478/angular2-redirect-to-login-page
@Directive({
  selector: '[appProtected]'
})
export class ProtectedDirective implements OnDestroy {
  private sub:any = null;

  constructor(private authService:AuthService, private router:Router) {
    this.sub = this.authService.af.auth.subscribe((auth) => {
      if (!auth) {
        this.router.navigateByUrl("/login"); // tells them they've been logged out (somehow)
      }
    });
  }

  ngOnDestroy() {
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }
}
