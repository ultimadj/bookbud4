/// <reference path="../../../\node_modules\quagga\type-definitions\quagga.d.ts" />
import {Component, OnInit, OnDestroy, NgZone, ViewChild} from '@angular/core';
import {UserAwareDataService} from "../user-aware-data.service";
import {FirebaseObjectObservable} from "angularfire2";
import {Book} from "../book";
import {IsbndbService} from "../isbndb.service";
import {IsbnSearchResult} from "../isbn-search-result";
import {Subscription} from "rxjs";
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
  key:string = "fakebook";

  bookPrevious:Book;
  book:Book;
  bookFbSub:Subscription;

  quaggaStateTemplate:any;
  waitingToDecode:boolean;
  @ViewChild('isbncontainer') isbnContainerElement;
  @ViewChild('isbninput') isbnInputElement;

  constructor(private uds:UserAwareDataService, private isbnService:IsbndbService, private _ngZone: NgZone) {
    window.bookComponentRef = {component: this, zone: _ngZone};
    this.waitingToDecode = false;
    this.book = new Book();
    this.bookPrevious = Object.assign({},this.book);

    /*
    Quagga barcode scanner settings
     */
    this.quaggaStateTemplate =
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
    if(this.bookFbSub) this.bookFbSub.unsubscribe();
    window.bookComponentRef = null;
  }
  ngOnInit(): void {
    this.bookFbSub = this.uds.userObject(this.key).switch().subscribe((book) => {
      if(!book.$exists()) {
        console.log("Book was deleted from firebase. Leaving UI state alone.");
      }
      this.book = Object.assign({}, book);
      this.bookPrevious = Object.assign({}, this.book);
      console.log("Book updated.", this.book);
    });
  }


  // Handle the barcode scan event and start Quagga to decode it
  triggerIsbnDecode(event) {
    let files = event.srcElement.files;
    let state = Object.assign({}, this.quaggaStateTemplate, {src: URL.createObjectURL(files[0])});
    this.waitingToDecode = true;
    Quagga.decodeSingle(state, window.bookComponentRef.component.inductCodeUpdateRequest);
  }
  // Get back into the angular ecosystem and delegate the handling of the updated result
  public inductCodeUpdateRequest(result) {
    window.bookComponentRef.zone.run(() => {
      window.bookComponentRef.component.handleCodeUpdate(result);
    });
  }
  // Handle the decode result
  public handleCodeUpdate(result) {
    this.isbnContainerElement.dividerColor = "primary"; // Clear warning state
    console.log("Quagga scan result", result);
    if(this.codeReturned(result)) {
      this.book.isbn = result.codeResult.code;

      // Subscribe to updates til we've received something saying we got a result or an error
      this.isbnService.isbnSearch(this.book.isbn).takeWhile((v, i) => (this.waitingToDecode)).subscribe((result:IsbnSearchResult) => {
        if(!result.searched) {
          console.log("Search started, but no response yet.");
          return;
        }
        if(result.found) {
          this.book.title = result.title;
        } else {
          this.isbnContainerElement.dividerColor = "warn";
        }
        this.waitingToDecode = false;
      });
    } else {
      console.log("No coderesult. ISBN was not read.");
      this.isbnContainerElement.dividerColor = "warn";
      this.waitingToDecode = false;
    }

    // Focus the ISBN input (target of this process)
    console.log("isbnInputElement", this.isbnInputElement);
    this.isbnInputElement.nativeElement.focus();
  }

  private codeReturned(result) {
    return result && result.codeResult && result.codeResult.code;
  }

  save() {
    console.log("Save", this.book);
    this.uds.save(this.key, this.book);
  }
  cancel() {
    this.book = Object.assign({}, this.bookPrevious);
  }
}
