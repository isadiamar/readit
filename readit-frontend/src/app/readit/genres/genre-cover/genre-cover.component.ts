import {Component, Input, OnInit} from '@angular/core';
import {Story} from "../../shared/models/story.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-genre-cover',
  templateUrl: './genre-cover.component.html',
  styleUrls: ['./genre-cover.component.css']
})
export class GenreCoverComponent implements OnInit {

  @Input() stories: Story[];
  @Input() title: boolean;
  cover: string;
  numberLikes: number;

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  open(story: Story) {
    this.router.navigate(["stories/" + story.id])
  }

}
