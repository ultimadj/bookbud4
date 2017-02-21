import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-taglist',
  templateUrl: './taglist.component.html',
  styleUrls: ['./taglist.component.css']
})
export class TaglistComponent implements OnInit {
  tags = [{value: 'Test'}, {value: 'Test2'}];

  constructor() { }

  ngOnInit() {
  }

  newRow() {
    this.tags.push({value: ""});
  }
  deleteRow(index:number) {
    this.tags = this.tags.splice(index, 1); // Currently deletes unexpected values. Look into this.
  }
}
