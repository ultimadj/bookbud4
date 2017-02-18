/// <reference path="../../../\node_modules\quagga\type-definitions\quagga.d.ts" />
import {Component, OnInit, OnDestroy, NgZone, ViewChild, Input} from '@angular/core';
import {UserAwareDataService} from "../user-aware-data.service";
import {Book} from "../book";
import {IsbndbService} from "../isbndb.service";
import {IsbnSearchResult} from "../isbn-search-result";
import {Subscription} from "rxjs";
import {Router, ActivatedRoute, Params} from "@angular/router";
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
  basePath:string = 'books/';
  @Input() uuid:string;

  bookPrevious:Book;
  book:Book;
  bookChanged:boolean = false;
  bookFbSub:Subscription;

  quaggaStateTemplate:any;
  waitingToDecode:boolean;
  @ViewChild('isbncontainer') isbnContainerElement;
  @ViewChild('isbninput') isbnInputElement;

  constructor(private uds:UserAwareDataService,
              private isbnService:IsbndbService,
              private _ngZone: NgZone,
              private route:ActivatedRoute, private router:Router
  ) {
    this.book = new Book();
    this.bookPrevious = Object.assign({},this.book);
    window.bookComponentRef = {component: this, zone: this._ngZone};

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
        numOfWorkers: 2,
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
  ngOnInit(): void {
    //http://stackoverflow.com/questions/35296704/angular2-how-to-call-component-function-from-outside-the-app
    this.route.params
      .subscribe((params: Params) => {
        if (params['id']) this.uuid = params['id'];
        let key = this.key();
        console.log(`Subscribing to ${key}`);
        this.bookFbSub = this.uds.userObject(key).switch().subscribe((book) => {
          if(!book.$exists()) {
            console.log("Book was deleted from firebase. Leaving UI state alone.");
          }
          this.book = Object.assign({}, book);
          this.bookPrevious = Object.assign({}, this.book);
          console.log("Book updated.", this.book);
        });
    });
    this.waitingToDecode = false;

  }
  ngOnDestroy(): void {
    if(this.bookFbSub) this.bookFbSub.unsubscribe();
    window.bookComponentRef = null;
  }

  private key() {
    return `${this.basePath}${this.uuid}`;
  }


  // Handle the barcode scan event and start Quagga to decode it
  triggerIsbnDecode(event) {
    let files = event.srcElement.files;
    this.quaggaStateTemplate.src = URL.createObjectURL(files[0]);
    this.waitingToDecode = true;
    console.log("triggerIsbnDecode");
    Quagga.decodeSingle(this.quaggaStateTemplate, window.bookComponentRef.component.inductCodeUpdateRequest);
  }
  // Get back into the angular ecosystem and delegate the handling of the updated result
  public inductCodeUpdateRequest(result) {
    console.log("Quagga responded with", result);
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
    console.log("newBookUuid", this.uuid);
    return result && result.codeResult && result.codeResult.code;
  }

  save() {
    console.log("Save", this.book);
    this.book.uuid = this.uuid;
    this.uds.save(this.key(), this.book);
    this.router.navigateByUrl('/books')
  }
  cancel() {
    this.book = Object.assign({}, this.bookPrevious);
    this.router.navigateByUrl('/books')
  }
}
