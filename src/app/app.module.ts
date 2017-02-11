import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {AngularFireModule, AuthProviders, AuthMethods} from "angularfire2";

const myFirebaseConfig = {
  apiKey: "AIzaSyCJ54VS7XEI_S54x8GwRwz-CwHNDWoB_m8",
  authDomain: "bookbud4.firebaseapp.com",
  databaseURL: "https://bookbud4.firebaseio.com",
  storageBucket: "bookbud4.appspot.com",
  messagingSenderId: "557974738162"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  imports:      [ BrowserModule,
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
