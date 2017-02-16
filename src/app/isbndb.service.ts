import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {AngularFireDatabase} from "angularfire2";
import {UserAwareDataService} from "./user-aware-data.service";
import {IsbnSearchResult} from "./isbn-search-result";

@Injectable()
export class IsbndbService {
  private accessKey = "HS839S6N"; // Limit 500 per day
  constructor(private http:Http, private uds:UserAwareDataService) {}

  isbnSearch(isbn:string): Observable<IsbnSearchResult> {
    let path = `isbn/${isbn}`;
    return this.uds.userObject(path).switch()
      .map((isbnSearchResult:IsbnSearchResult) => {
        if(isbnSearchResult.searched) {
          console.log("isbn search cache hit", isbnSearchResult);
          return this.processIsbnResult(isbnSearchResult);
        }
        console.log(`No result for isbn ${isbn}. Requesting search.`);
        this.isbnSearchIsbndb(isbn, path);
        return new IsbnSearchResult()
      });
  }
  private processIsbnResult(isbnSearchResult:IsbnSearchResult): IsbnSearchResult {
    if(isbnSearchResult.raw && isbnSearchResult.raw._body) {
      let bodyObj = JSON.parse(isbnSearchResult.raw._body);
      if(bodyObj.query.results.error) {
        console.log("Isbn search returned error", bodyObj.query.results.error);
        isbnSearchResult.found = false;
        return isbnSearchResult;
      }

      isbnSearchResult.found = true;
      let data = bodyObj.query.results.json.data;
      isbnSearchResult.title = data.title;
    } else {
      isbnSearchResult.found = false;
    }
    console.log("Processed isbnDb result", isbnSearchResult);
    return isbnSearchResult;
  }

  // http://isbndb.com/api/books.xml?access_key=HS839S6N&index1=isbn&value1=9780794513856
  private isbnSearchIsbndb(isbn:string, path:string): void {
    let sourceUrl = `http://isbndb.com/api/v2/json/HS839S6N/book/${isbn}`;
    let query = `select * from json where url='${sourceUrl}'`;

    let yqlQueryUrl = `https://query.yahooapis.com/v1/public/yql?q=${encodeURIComponent(query)}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
    this.http.get(yqlQueryUrl)
      .subscribe((result:any) => {
        let searchResult = new IsbnSearchResult();
        searchResult.raw = result;
        searchResult.searched = true;

      console.log("Setting search result", searchResult);
      this.uds.save(path, searchResult);
    });
  }
}
