import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  newBookUuid:string;

  constructor() {
    this.newBookUuid = UUID.UUID();
  }
}
