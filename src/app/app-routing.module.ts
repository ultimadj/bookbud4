import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookComponent} from "./book/book.component";
import {LoginComponent} from "./login/login.component";
import {LandingComponent} from "./landing/landing.component";
import {AddBookComponent} from "./add-book/add-book.component";
import {BookListComponent} from "./book-list/book-list.component";
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'dashboard', component: LandingComponent},
  { path: 'addbook', component: AddBookComponent},
  { path: 'books', component: BookListComponent},
  { path: 'book/:id', component: BookComponent},
  { path: 'login', component: LoginComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
