import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Story} from "../../shared/models/story.model";
import {AuthService} from "../../../core/auth.service";
import {ActivatedRoute} from "@angular/router";
import {FilterService} from "../../shared/services/filter.service";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-user-favourites',
  templateUrl: './user-favourites.component.html',
  styleUrls: ['./user-favourites.component.css']
})
export class UserFavouritesComponent implements OnInit {

  @Output() isSelected = new EventEmitter<string>();
  favouriteStories: Story[];
  showFavoriteStories: Story[];
  userId: string;
  numberStories: number;

  constructor(private authService: AuthService, private activeRouter: ActivatedRoute, private filterService: FilterService, private userService: UserService) {
  }

  @Input() set isFavourite(isFavourite: string) {
    this.checkIsFavourite(isFavourite)
  }

  ngOnInit(): void {
    this.userId = this.activeRouter.snapshot.paramMap.get('id')!;

    this.userService.findFavouritesByUser(+this.userId).subscribe(stories => {
      this.favouriteStories = stories;
      this.showFavoriteStories = this.favouriteStories.slice(0, 5);
    })
  }

  sendMessage() {
    this.isSelected.emit("favourites")
  }

  checkIsFavourite(input: string) {
    if (input == "favourites") {
      this.showFavoriteStories = this.favouriteStories;
    } else if (this.favouriteStories) {
      this.showFavoriteStories = this.favouriteStories.slice(0, 5);
    }
  }
}
