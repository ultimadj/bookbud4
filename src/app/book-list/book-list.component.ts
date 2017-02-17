import { Component, OnInit } from '@angular/core';
import {UserAwareDataService} from "../user-aware-data.service";
import {Book} from "../book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books:Book[] = [];
  displayedBooks:Book[] = [];

  constructor(private uds:UserAwareDataService) {
  }

  ngOnInit() {
    this.uds.userObject('books/').switch().subscribe((bookHolder:any) => {
      if(!bookHolder) return;

      let bookList = this.uds.strip(bookHolder);
      let newBooks = [];
      Object.keys(bookList).forEach(function(key,index) {
        let book = bookHolder[key];
        newBooks.push(book);
        book.uuid = key;
      });
      this.books = newBooks;
      this.books.sort((a, b) => {
        if (a.title < b.title)
          return -1;
        if (a.title > b.title)
          return 1;
        return 0;
      });
      this.displayedBooks = this.books;
      console.log("Book count", this.books.length);
    });
  }

  filter(search) {
    console.log("filter", search);
    if(!search) this.displayedBooks = Object.assign({}, this.books);
    let newBooks = [];
    this.books.forEach((book,i) => {
      if(book.title.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1) {
        newBooks.push(book);
      }
    });
    this.displayedBooks = newBooks;
    console.log("Filtered book count", this.displayedBooks.length);
  }
}
