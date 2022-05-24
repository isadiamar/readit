import {Component, OnInit} from '@angular/core';
import {StoryService} from "../../shared/services/story.service";
import {Story} from "../../shared/models/story.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {Router} from "@angular/router";
import {Genre} from "../../shared/models/genre.enum";

@Component({
  selector: 'app-story-cover',
  templateUrl: './story-cover.component.html',
  styleUrls: ['./story-cover.component.css']
})
export class StoryCoverComponent implements OnInit {

  stories: Story[] = [];

  constructor(private storyService:StoryService, private dialog: MatDialog, private route:Router) { }

  ngOnInit(): void {
    this.storyService.getAll().subscribe(res =>{
        this.stories = res;
        this.stories.forEach(story=>{
          // @ts-ignore
          story.genre1 = Genre[story.genre1]
        })
      })
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
}
