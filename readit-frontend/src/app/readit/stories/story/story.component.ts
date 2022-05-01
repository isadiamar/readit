import { Component, OnInit } from '@angular/core';
import {Status} from "../../shared/models/status.enum";
import {StoryService} from "../../shared/services/story.service";
import {map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

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
  id:string;

  constructor(private storyService:StoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = <string>this.route.snapshot.paramMap.get('id')
    this.storyService.get(+this.id).subscribe(res =>{
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
