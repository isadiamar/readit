import { Component, OnInit } from '@angular/core';
import {Status} from "../../shared/models/status.enum";
import {StoryService} from "../../shared/services/story.service";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  isFavorite: boolean = false;
  title:string;
  description:string;
  color:string;
  status:Status;

  constructor(private storyService:StoryService) { }

  ngOnInit(): void {
    this.storyService.get().subscribe(res =>{
      this.title = res.title
      this.description = res.description
      this.color = res.color ? res.color : "#51c96a"
      this.status = res.status
    })
  }

  setFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
