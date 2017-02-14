import { Component, OnInit } from '@angular/core';
import {UserAwareDataService} from "../user-aware-data.service";
import {FirebaseObjectObservable} from "angularfire2";
import {Book} from "../book";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  book:Book;
  bookFb:FirebaseObjectObservable<any>;
  bookFbSub:any;

  constructor(private uds:UserAwareDataService) {
    this.book = new Book();
    uds.readiness.subscribe((ready) => {
      if(ready) {
        this.subscribeToData();
      } else {
        this.clearSubscription();
      }
    });
  }

  private clearSubscription() {
    this.bookFb = null;
    if(this.bookFbSub) this.bookFbSub.unsubscribe();
  }
  private subscribeToData() {
    if(this.bookFb) return;

    this.bookFb = this.uds.userObject("fakebook");
    this.bookFbSub = this.bookFb.subscribe((bookHolder) => {
      if(bookHolder.book) {
        this.book = bookHolder.book;
        console.log("Book updated.", bookHolder);
      } else {
        console.log("Book is empty. Danger!");
      }
    });
  }

  save() {
    this.bookFb.set({book: this.book});
  }
}
