import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../shared/services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit, OnDestroy {

  description: string | undefined;
  subscription: Subscription;

  userId: string;

  constructor(private userService: UserService, private activateRoute: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.userId = this.activateRoute.snapshot.paramMap.get('id')!;

    this.subscription = this.dataService.descriptionMessage.subscribe(description => this.description = description);

    if (this.userId) {
      this.userService.get(+this.userId).subscribe(res => {
        this.description = res.description;
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
