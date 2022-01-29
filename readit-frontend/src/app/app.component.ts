import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'readit-frontend';

  isMainMenu: boolean;
  isWelcomeMenu: boolean;


  constructor() {
  }

  ngOnInit() {
    this.checkCurrentRoute();
  }

  private checkCurrentRoute() {
    setTimeout(() => {
      this.isMainMenu = window.location.pathname != '/welcome' && window.location.pathname != '/loginForm';
      this.isWelcomeMenu = window.location.pathname == '/welcome';
    }, 0.5);
  }

}
