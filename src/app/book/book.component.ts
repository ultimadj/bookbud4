import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  title = "First Book";
  isbn = "123456789";

  constructor() { }

  ngOnInit() {
  }

}
