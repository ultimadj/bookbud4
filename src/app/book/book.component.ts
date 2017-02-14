import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserAwareDataService} from "../user-aware-data.service";
import {FirebaseObjectObservable} from "angularfire2";
import {Book} from "../book";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnDestroy, OnInit {
  book:Book;
  bookFb:FirebaseObjectObservable<any>;
  bookFbSub:any;

  constructor(private uds:UserAwareDataService) {
    this.book = new Book();
  }
  ngOnDestroy(): void {
    this.clearSubscription();
  }
  ngOnInit(): void {
    this.uds.readiness.subscribe((ready) => {
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
      }
    });
  }

  browseIsbn() {

  }

  scanIsbn() {

  }

  save() {
    this.bookFb.set({book: this.book});
  }
}
