import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth.service";

@Component({
  selector: 'app-user-dasboard',
  templateUrl: './user-dasboard.component.html',
  styleUrls: ['./user-dasboard.component.css']
})
export class UserDasboardComponent implements OnInit {
  isSelected: string = "stories";

  activeUser:number
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.activeUser = this.authService.getAuthenticatedUserId();
  }

}
