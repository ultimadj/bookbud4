/// <reference path="../../../\node_modules\quagga\type-definitions\quagga.d.ts" />
import {Component, OnInit, OnDestroy, NgZone, ViewChild} from '@angular/core';
import {UserAwareDataService} from "../user-aware-data.service";
import {FirebaseObjectObservable} from "angularfire2";
import {Book} from "../book";
// import {QuaggaJSConfigObject} from "quagga/type-definitions/quagga";

declare var Quagga: any;
declare var window:any;

/*
 https://serratus.github.io/quaggaJS/examples/file_input.js
 https://github.com/gelliott181/ng2-quagga-issue/blob/master/src/app/app.component.ts
 http://stackoverflow.com/questions/35296704/angular2-how-to-call-component-function-from-outside-the-app

 http://stackoverflow.com/questions/32693061/angular-2-typescript-get-hold-of-an-element-in-the-template
 */
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnDestroy, OnInit {
  bookPrevious:Book;
  book:Book;
  bookFb:FirebaseObjectObservable<any>;
  bookFbSub:any;
  state:any;
  @ViewChild('isbncontainer') isbnContainerElement;
  @ViewChild('isbninput') isbnInputElement;
  waitingToDecode:boolean;

  constructor(private uds:UserAwareDataService, private _ngZone: NgZone) {
    window.bookComponentRef = {component: this, zone: _ngZone};
    this.waitingToDecode = false;
    this.book = new Book();
    this.bookPrevious = Object.assign({},this.book);

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
            format: "ean_reader",
            config: {}
          }]
        },
        locate: true,
        src: null
      };
  }
  ngOnDestroy(): void {
    this.clearSubscription();
    window.bookComponentRef = null;
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

  // Handle the event, and start Quagga working on decoding it
  triggerIsbnDecode(event) {
    var files = event.srcElement.files;
    this.state.src = URL.createObjectURL(files[0]);
    this.isbnContainerElement.dividerColor = "primary"; // Clear warning state
    this.waitingToDecode = true;
    Quagga.decodeSingle(this.state, window.bookComponentRef.component.handleCodeUpdateFromExternalCall);
  }
  // Get back into the angular ecosystem and delegate the handling of the updated result
  public handleCodeUpdateFromExternalCall(result) {
    window.bookComponentRef.zone.run(() => {
      window.bookComponentRef.component.handleCodeUpdate(result);
    });
  }
  // Handle the decode result
  public handleCodeUpdate(result) {
    this.waitingToDecode = false;
    console.log("Quagga scan result", result);
    if(result && result.codeResult && result.codeResult.code) {
      this.book.isbn = result.codeResult.code;
      this.uds.queueIsbnRequest(this.book.isbn); // TODO: subscribe to result
    } else {
      console.log("No coderesult. ISBN was not read.");
      this.isbnContainerElement.dividerColor = "warn";
    }
    console.log("isbnInputElement", this.isbnInputElement);
    this.isbnInputElement.nativeElement.focus();
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
        this.bookPrevious = Object.assign({},this.book);
        console.log("Book updated.", bookHolder);
      }
    });
  }

  save() {
    this.bookFb.set({book: this.book});
  }

  cancel() {
    this.book = this.bookPrevious;
  }
}
