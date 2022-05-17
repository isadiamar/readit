import {Component, OnDestroy} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";

@Component({
  templateUrl: 'readit.component.html',
  styleUrls: ['readit.component.css'],
})

export class ReaditComponent implements OnDestroy {
  isMainMenu: boolean;
  isWelcomeMenu: boolean;
  routeChange: Subscription;

  constructor(private router: Router) {
    this.routeChange = this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        this.isMainMenu = event.url != '/welcome';
        this.isWelcomeMenu = event.url == '/welcome';
      });
  }

  ngOnDestroy() {
    this.routeChange.unsubscribe();
  }
}
