import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  selected: string = 'account'

  routeChange: Subscription;

  constructor() {
  }

  ngOnInit(): void {
  }

  isSelected($event: string) {
    if (this.selected == $event) {
      this.selected = 'account';
    } else {
      this.selected = $event
    }
  }

}
