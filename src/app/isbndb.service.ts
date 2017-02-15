import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class IsbndbService {
  private accessKey = "HS839S6N"; // Limit 500 per day
  constructor(private http:Http) {}

  // http://isbndb.com/api/books.xml?access_key=HS839S6N&index1=isbn&value1=9780794513856
  isbnSearch(isbn:string): Observable<any> {
    let sourceUrl = `http://isbndb.com/api/v2/json/HS839S6N/book/${isbn}`;
    let query = `select * from json where url='${sourceUrl}'`;

    let yqlQueryUrl = `https://query.yahooapis.com/v1/public/yql?q=${encodeURIComponent(query)}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
    return this.http.get(yqlQueryUrl)
      .map(this.toJson);
  }
  toJson(res: Response) {
    console.log("isbnSearch", res);
    let bodyXml = res.toString();
  }
}
