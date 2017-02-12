import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import { LoginRouterOutletComponent } from './login-router-outlet/login-router-outlet.component';
import {AppRoutingModule} from "./app-routing.module";
import { BookComponent } from './book/book.component';
import { ProtectedDirective } from './protected.directive';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import {UserService} from "./user.service";
import {MaterialModule} from "@angular/material";

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyCJ54VS7XEI_S54x8GwRwz-CwHNDWoB_m8",
  authDomain: "bookbud4.firebaseapp.com",
  databaseURL: "https://bookbud4.firebaseio.com",
  storageBucket: "bookbud4.appspot.com",
  messagingSenderId: "557974738162"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};


@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  declarations: [ AppComponent, LoginRouterOutletComponent, BookComponent, ProtectedDirective, LoginComponent, LandingComponent ],
  providers: [UserService],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
