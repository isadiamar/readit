import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";

@Component({
  templateUrl: 'readit.component.html',
  styleUrls: ['readit.component.css'],
})

export class ReaditComponent implements OnDestroy {
  isMainMenu: boolean;
  isWelcomeMenu: boolean;
  routeChange: Subscription;
  episode_condition:string;

  constructor(private router: Router, private activatedRoute:ActivatedRoute) {
    let story_id = this.activatedRoute.snapshot.paramMap.get('story_id');
     let episode_id = this.activatedRoute.snapshot.paramMap.get('episode_id');

    this.checkRoute(story_id, episode_id);

    this.routeChange = this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        this.isMainMenu = event.url != '/welcome' && event.url != '/stories/1/episodes/1';
        this.isWelcomeMenu = event.url == '/welcome';
      });
  }

  ngOnDestroy() {
    this.routeChange.unsubscribe();
  }

  checkRoute(story_id: string | null, episode_id: string | null) {
    if (this.search("stories") && this.search("episodes") && !this.search('new') && !this.search('edit')) {
      this.episode_condition = '/stories/' + story_id + '/episodes/' + episode_id;
    }else{
      this.episode_condition = '';
    }
  }

  search(word:string):boolean{
    return window.location.toString().includes(word)
  }
}
