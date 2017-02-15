/// <reference path="../../../\node_modules\quagga\type-definitions\quagga.d.ts" />
import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserAwareDataService} from "../user-aware-data.service";
import {FirebaseObjectObservable} from "angularfire2";
import {Book} from "../book";
// import {QuaggaJSConfigObject} from "quagga/type-definitions/quagga";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnDestroy, OnInit {
  book:Book;
  bookFb:FirebaseObjectObservable<any>;
  bookFbSub:any;
  state:any;

  constructor(private uds:UserAwareDataService) {
    this.book = new Book();

    this.state =
      {
        inputStream: {
          size: 800
        },
        locator: {
          patchSize: "medium",
          halfSample: false
        },
        numOfWorkers: 1,
        decoder: {
          readers: [{
            format: "code_128_reader",
            config: {}
          }]
        },
        locate: true,
        src: null
      };
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

    // https://serratus.github.io/quaggaJS/examples/file_input.js
    // https://github.com/gelliott181/ng2-quagga-issue/blob/master/src/app/app.component.ts
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

  decodeIsbn(event) {
    var files = event.srcElement.files;
    console.log(files);
  }

  save() {
    this.bookFb.set({book: this.book});
  }
}
