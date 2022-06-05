import {Component, OnInit} from '@angular/core';
import {Story} from "../../shared/models/story.model";
import {FilterService} from "../../shared/services/filter.service";
import {Genre} from "../../shared/models/genre.enum";
import {Utils} from "../../shared/utils/Utils";

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  newStories: Story[];
  horrorStories: Story[];
  fantasyStories: Story[];
  popularGenreStories:Story[];
  mostLikedStories:Story[];

  selectedGenre: Genre;
  genres: Genre[] = [Genre.COMEDY, Genre.ROMANCE, Genre.DRAMA, Genre.HISTORICAL, Genre.HORROR, Genre.SLICE_OF_LIFE, Genre.FANTASY];

  constructor(private filterService: FilterService) {
  }

  ngOnInit(): void {
    this.filterService.findByGenre(Utils.getEnumKeyByValue(Genre, Genre.ROMANCE)).subscribe(stories => {
      this.horrorStories = stories;
    });

    this.filterService.findByGenre(Utils.getEnumKeyByValue(Genre, Genre.ROMANCE)).subscribe(stories => {
      this.fantasyStories = stories;
    });

    this.filterService.findByNewness().subscribe(stories => {
      this.newStories = stories.slice(0, 5)
    })

    this.selectedGenre = Genre.ROMANCE;

    this.filterService
      .sortByPopularity(Utils.getEnumKeyByValue(Genre,this.selectedGenre))
      .subscribe(stories => {
        console.log(stories.slice(0,3))
        this.popularGenreStories = stories.slice(0,3);
      })

    this.filterService.findByPopularity().subscribe(stories =>{
      this.mostLikedStories = stories.slice(0,3);
    })
  }

  selectGenre(genre:Genre) {
    this.selectedGenre = genre;
    this.filterService
      .sortByPopularity(Utils.getEnumKeyByValue(Genre,this.selectedGenre))
      .subscribe(stories => {
        this.popularGenreStories = stories.slice(0,3);
      })
  }
}
