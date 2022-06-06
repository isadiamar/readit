import {Component, Input, OnInit} from '@angular/core';
import {StoryService} from "../../shared/services/story.service";
import {Story} from "../../shared/models/story.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {Router} from "@angular/router";
import {Genre} from "../../shared/models/genre.enum";
import {AuthService} from "../../../core/auth.service";

@Component({
  selector: 'app-story-cover',
  templateUrl: './story-cover.component.html',
  styleUrls: ['./story-cover.component.css']
})
export class StoryCoverComponent implements OnInit {

  stories: Story[] = [];
  isInput:boolean;

  @Input() set storiesInput(storiesInput:Story[]){
    this.isInput = true;
    this.stories = this.updateGenres(storiesInput);
  }

  constructor(private storyService:StoryService, private dialog: MatDialog, private route:Router, private authService:AuthService ) { }

  ngOnInit(): void {
    if(!this.isInput){
      this.storyService.getAll().subscribe(res =>{
        this.stories = res;
        this.stories.forEach(story=>{
          // @ts-ignore
          story.genre1 = Genre[story.genre1]
        })
      })
    }

  }

  delete(id: number) {
      this.dialog.open(ConfirmationDialogComponent, {data: {storyId:id, type:'story'}});
  }

  open(id:number) {
      this.route.navigate(['stories/' + id]);
  }

  redirect(id:number) {
    this.route.navigate(['stories/' + id + '/episodes/new'])
  }

  isActiveUser(story:Story):boolean{
    return this.authService.getAuthenticatedUserId() === story.userId;
  }

  updateGenres(stories:Story[]):Story[]{
    for(let i =0; i< stories.length; i++){
      // @ts-ignore
      stories[i].genre1 = Genre[stories[i].genre1];
    }
    return stories;
  }
}
