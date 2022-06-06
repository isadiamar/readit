import {Component, OnInit} from '@angular/core';
import {Genre} from "../../shared/models/genre.enum";
import {FilterService} from "../../shared/services/filter.service";
import {Story} from "../../shared/models/story.model";
import {Subscription} from "rxjs";
import {Utils} from "../../shared/utils/Utils";
import {Status} from "../../shared/models/status.enum";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genres: Genre[] = [Genre.COMEDY, Genre.ROMANCE, Genre.DRAMA, Genre.HISTORICAL, Genre.HORROR, Genre.SLICE_OF_LIFE, Genre.FANTASY];
  status:Status[] = [Status.IN_PROGRESS, Status.COMPLETE, Status.DROPPED];
  selectedGenre:Genre;
  stories:Story[];

  subscriber:Subscription;


  constructor(private filterService:FilterService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let genreMessage = this.route.snapshot.paramMap.get('genre')
    if(genreMessage){
      // @ts-ignore
      this.selectedGenre = Genre[genreMessage];
    }else{
      this.selectedGenre = Genre.ROMANCE
    }
    this.filterService.findByGenre(Utils.getEnumKeyByValue(Genre,this.selectedGenre)).subscribe(stories => {
      this.stories = stories;
    });
  }


  searchByGenre(genre:Genre) {
    this.selectedGenre = genre;
    this.filterService.findByGenre(Utils.getEnumKeyByValue(Genre,this.selectedGenre)).subscribe(stories => {
      this.stories = stories;
    });
  }

  searchByStatus(status: string){
    this.filterService
      .findByGenreAndStatus(Utils.getEnumKeyByValue(Genre,this.selectedGenre), Utils.getEnumKeyByValue(Status,status))
      .subscribe(stories => {
        this.stories = stories;
      })
  }

  sortByPopularity() {
    this.filterService
      .sortByPopularity(Utils.getEnumKeyByValue(Genre,this.selectedGenre))
      .subscribe(stories => {
        this.stories = stories;
      })
  }
}
