import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyCJ54VS7XEI_S54x8GwRwz-CwHNDWoB_m8",
  authDomain: "bookbud4.firebaseapp.com",
  databaseURL: "https://bookbud4.firebaseio.com",
  storageBucket: "bookbud4.appspot.com",
  messagingSenderId: "557974738162"
};

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
