import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Story} from "../../shared/models/story.model";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userId:string;

  userStories:Story[];

  numberStories:number;
  selected:string = 'account'
  res:string | null;

  routeChange:Subscription;

  constructor() {
  }

  ngOnInit(): void {
  }

  isSelected($event: string) {
    if (this.selected == $event){
      this.selected = 'account';
    }else{
      this.selected = $event
    }
  }

}
