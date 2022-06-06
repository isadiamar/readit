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
  @Input() set isUserStory(isUserStory:string){
    this.checkIsUserStory(isUserStory)
  }

  @Input() userId?: number
  userStories:Story[];
  showUserStories:Story[];

  constructor(private authService:AuthService, private activeRouter:ActivatedRoute, private filterService:FilterService, private userService:UserService) { }

  ngOnInit(): void {
    if (!this.userId) {
      this.userId = parseInt( this.activeRouter.snapshot.paramMap.get('id')!);
    }

    this.userService.findStoryList(this.userId).subscribe(stories =>{
      this.userStories = stories;
      this.showUserStories = stories.slice(0,3)
    })
  }

  sendMessage() {
    this.isSelected.emit("stories")
  }

  private checkIsUserStory(input: string) {
    if(input == "stories") {
      this.showUserStories = this.userStories;
    } else if (this.userStories){
      this.showUserStories = this.userStories.slice(0, 3);
    }

  }
}
