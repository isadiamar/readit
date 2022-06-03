import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommentService} from "../../shared/services/comment.service";
import {Comment} from "../../shared/models/comment.model";
import {ActivatedRoute} from "@angular/router";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit , OnDestroy{

  comments:Comment[] = [];
  episode_id:string;
  isActiveUser: boolean = true;

  subscriber:Subscription;

  constructor(private commentService:CommentService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    let storyId = this.activatedRoute.snapshot.paramMap.get('story_id')!;

    this.episode_id = this.activatedRoute.snapshot.paramMap.get('episode_id')!;

    this.commentService.getAll(+this.episode_id).subscribe(comments => {
      this.comments = comments;
    });

    this.subscriber = this.commentService.episodeCommentsUpdate.subscribe(() => {
      this.commentService.getAll(+this.episode_id).subscribe(comments => {
        this.comments = comments;
      });
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  delete(id:number) {
    this.commentService.delete(id).subscribe(_ => this.commentService.episodeCommentsUpdate.next(),
    )
  }
}
