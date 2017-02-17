import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  book() {
    this.router.navigateByUrl('addbook')
  }
}
