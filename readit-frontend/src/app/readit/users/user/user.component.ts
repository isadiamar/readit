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

  activeUser:boolean;
  userId:string;

  userStories:Story[];

  numberStories:number;
  selected:string;
  res:string | null;

  routeChange:Subscription;

  constructor(private authService:AuthService, private activeRouter:ActivatedRoute, private router:Router) {
    this.routeChange = this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        this.selected = this.activeRouter.snapshot.paramMap.get('page')!;

      });
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
