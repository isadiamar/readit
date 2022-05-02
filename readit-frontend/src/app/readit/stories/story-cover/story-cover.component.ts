import { Component, OnInit } from '@angular/core';
import {StoryService} from "../../shared/services/story.service";
import {Story} from "../../shared/models/story.model";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-story-cover',
  templateUrl: './story-cover.component.html',
  styleUrls: ['./story-cover.component.css']
})
export class StoryCoverComponent implements OnInit {

  storyModel:Story;
  stories: Story[] = [];

  title:string;
  constructor(private storyService:StoryService) { }

  ngOnInit(): void {
    this.storyService.getAll().forEach(res => this.stories = res)
    console.log(this.stories)

  }

}
