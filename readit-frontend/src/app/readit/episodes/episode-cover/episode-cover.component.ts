import { Component, OnInit } from '@angular/core';
import {Episode} from "../../shared/models/episode.model";
import {Utils} from "../../shared/utils/Utils";

@Component({
  selector: 'app-episode-cover',
  templateUrl: './episode-cover.component.html',
  styleUrls: ['./episode-cover.component.css']
})
export class EpisodeCoverComponent implements OnInit {
   a:boolean;
  episodeModel:Episode;
  episodes: Episode[] = [
    {id:1,title:"Chapter 1: The story of a mermaid", pdf:"pdf", date:Utils.formatDate(new Date(2019, 11, 5)), storyId:1, numberEpisode:1},
    {id:2, title:"primero", pdf:"pdf", date:Utils.formatDate(new Date(2019, 12, 5)), storyId:1, numberEpisode:2},
    {id:3, title:"primero", pdf:"pdf", date:Utils.formatDate(new Date(2020, 1, 5)), storyId:1, numberEpisode:3},
  ];

  constructor() { }

  ngOnInit(): void {
    this.a = true;
  }

  update(id:number) {

  }

  delete(id:number) {

  }
}
