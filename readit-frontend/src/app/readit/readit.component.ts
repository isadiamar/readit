import {Component, OnInit} from "@angular/core";

@Component({
  templateUrl: 'readit.component.html',
  styleUrls: ['readit.component.css'],
})

export class ReaditComponent implements OnInit {
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
