import { Component, OnInit } from '@angular/core';
import {CommentService} from "../../shared/services/comment.service";
import {Comment} from "../../shared/models/comment.model";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comments:Comment[] = [];
  constructor(private commentService:CommentService) { }

  ngOnInit(): void {
    this.commentService.getAll().subscribe(comments => {
      this.comments = comments;
    });

    this.commentService.episodeCommentsUpdate.subscribe(() => {
      this.commentService.getAll2().subscribe(comments => {
        this.comments = comments;
      });
    });
  }

}
