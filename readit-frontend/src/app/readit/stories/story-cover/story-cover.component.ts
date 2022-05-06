import { Component, OnInit } from '@angular/core';
import {StoryService} from "../../shared/services/story.service";
import {Story} from "../../shared/models/story.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-story-cover',
  templateUrl: './story-cover.component.html',
  styleUrls: ['./story-cover.component.css']
})
export class StoryCoverComponent implements OnInit {

  storyModel:Story;
  stories: Story[] = [];

  title:string;
  constructor(private storyService:StoryService, private dialog: MatDialog, private route:Router) { }

  ngOnInit(): void {
    this.storyService.getAll().forEach(res => this.stories = res).then(r => console.log('Success Load') )
  }

  delete(id: number | undefined) {
    if (id){
      this.dialog.open(ConfirmationDialogComponent, {data: {id:id}});
    }
  }

  update(id:number | undefined) {
    if (id) {
      this.route.navigate(['stories/edit/'+ id]).then(r => console.log(r));
    }
  }
}
