import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  activeUser:boolean;
  userId:string;

  constructor(private authService:AuthService, private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.activeRouter.snapshot.paramMap.get('id')!;

    this.activeUser = this.authService.getAuthenticatedUserId() == +this.userId;
  }

}
