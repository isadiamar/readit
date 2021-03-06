import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../core/auth.service";
import {ActivatedRoute} from "@angular/router";
import {FilterService} from "../../shared/services/filter.service";
import {UserService} from "../../shared/services/user.service";
import {Story} from "../../shared/models/story.model";

@Component({
  selector: 'app-user-stories',
  templateUrl: './user-stories.component.html',
  styleUrls: ['./user-stories.component.css']
})
export class UserStoriesComponent implements OnInit {
  @Output() isSelected = new EventEmitter<string>();
  @Input() userId?: number
  @Input() isDashboard?: boolean;
  userStories: Story[];
  showUserStories: Story[];

  constructor(private authService: AuthService, private activeRouter: ActivatedRoute, private filterService: FilterService, private userService: UserService) {
  }

  @Input() set isUserStory(isUserStory: string) {
    this.checkIsUserStory(isUserStory)
  }

  ngOnInit(): void {
    if (!this.userId) {
      this.userId = parseInt(this.activeRouter.snapshot.paramMap.get('id')!);
    }

    this.userService.findStoryList(this.userId).subscribe(stories => {
      this.userStories = stories;
      this.showUserStories = this.isDashboard ? stories : stories.slice(0, 3);
    })
  }

  sendMessage() {
    if (!this.isDashboard) {
      this.isSelected.emit("stories")
    }

  }

  private checkIsUserStory(input: string) {
    if (input == "stories") {
      this.showUserStories = this.userStories;
    } else if (this.userStories) {
      this.showUserStories = this.userStories.slice(0, 3);
    }
  }
}
