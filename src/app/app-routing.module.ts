import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookComponent} from "./book/book.component";
import {LoginComponent} from "./login/login.component";
import {LandingComponent} from "./landing/landing.component";
const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'book',  component: BookComponent },
  { path: 'login', component: LoginComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
