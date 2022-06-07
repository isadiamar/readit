import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";
import {DataService} from "../../shared/services/data.service";
import {UserService} from "../../shared/services/user.service";


@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  nickname:string | undefined;
  description:string | undefined;

  activeUser:boolean;
  userId:string;

  constructor(private authService:AuthService, private activeRouter:ActivatedRoute,  private dialog: MatDialog, private dataService:DataService, private userService:UserService) { }

  ngOnInit(): void {
    this.userId = this.activeRouter.snapshot.paramMap.get('id')!;
    this.activeUser = this.authService.getAuthenticatedUserId() == +this.userId;

    this.userService.get(+this.userId).subscribe(res =>{
      this.nickname = res.nickname;
    })

  }

  edit() {
    this.dialog.open(UserFormComponent, {data:{userId:this.userId}})
      .afterClosed().subscribe(res => {
        this.nickname = res.data.nickname;
        this.dataService.saveDescription(res.data.description);
    })
  }
}
