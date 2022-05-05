import { Component, OnInit } from '@angular/core';
import {StoryService} from "../../shared/services/story.service";
import {Story} from "../../shared/models/story.model";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-story-cover',
  templateUrl: './story-cover.component.html',
  styleUrls: ['./story-cover.component.css']
})
export class StoryCoverComponent implements OnInit {

  storyModel:Story;
  stories: Story[] = [];

  title:string;
  constructor(private storyService:StoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.storyService.getAll().forEach(res => this.stories = res).then(r => console.log('Success Load') )
  }

  delete(id: number | undefined) {
    console.log(id)
    if (id){
      this.dialog.open(ConfirmationDialogComponent, {data: {id:id}});
    }
      //this.dialog.open()
      //Aqui mandar mensaje de confirmación primero
    // this.storyService.delete(id).subscribe(
    //   next => console.log("Success"),
    //   error => console.log("Error"),
    //   ()=>window.location.reload()
  //)
  }
}
