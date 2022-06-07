import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  authenticatedUser: number;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authenticatedUser = this.authService.getAuthenticatedUserId()
  }

  redirect(route: string) {
    this.router.navigate([route]);
  }

  redirectWithObject(route: string, object: string) {
    this.router.navigate([route, {page: object}])
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/welcome"]);
  }
}
