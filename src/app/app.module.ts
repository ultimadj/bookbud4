import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AppRoutingModule} from "./app-routing.module";
import { NavComponent } from './nav/nav.component';
import {AuthGuardService} from "./auth-guard.service";

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
    AppRoutingModule
  ],
  declarations: [ AppComponent, LoginComponent, DashboardComponent, NavComponent ],
  providers: [AuthGuardService],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
