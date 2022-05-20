import { Component, OnInit } from '@angular/core';
import {Status} from "../../shared/models/status.enum";
import {StoryService} from "../../shared/services/story.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Genre} from "../../shared/models/genre.enum";

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
  author:string | undefined
  cover: string;
  genre1:Genre;
  genre2:Genre;
  constructor(private storyService:StoryService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id = <string>this.route.snapshot.paramMap.get('id')
    this.storyService.get(+this.id).subscribe(res =>{
      this.title = res.title
      this.description = res.description
      this.color = res.color ? res.color : "#51c96a"
      // @ts-ignore
      this.status = Status[res.status]
      this.author = res.username
      this.cover = res.cover ? res.cover : '/assets/img/cover-story.png';
      // @ts-ignore
      this.genre1 = Genre[res.genre1]
      // @ts-ignore
      this.genre2 = Genre[res.genre2]
    })
  }

  setFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  update() {
    this.router.navigate(['stories/edit/'+ +this.id]).then(r => console.log(r));
  }
}
