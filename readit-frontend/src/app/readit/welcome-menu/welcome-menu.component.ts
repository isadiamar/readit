import {Component, OnDestroy, OnInit} from '@angular/core';
import {WelcomeService} from "../../shared/services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-welcome-menu',
  templateUrl: './welcome-menu.component.html',
  styleUrls: ['./welcome-menu.component.css']
})
export class WelcomeMenuComponent implements OnInit, OnDestroy {
  message: string;
  subscription: Subscription;

  constructor(private data: WelcomeService) {
  }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  newMessage(message: string) {
    this.data.changeMessage(message);
  }
}
