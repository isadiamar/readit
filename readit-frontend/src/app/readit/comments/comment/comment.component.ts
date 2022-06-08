import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommentService} from "../../shared/services/comment.service";
import {Comment} from "../../shared/models/comment.model";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../../core/auth.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

  comments: Comment[] = [];
  episode_id: string;
  isActiveUser: boolean = true;

  userId: number;
  subscriber: Subscription;

  constructor(private commentService: CommentService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    let storyId = this.activatedRoute.snapshot.paramMap.get('story_id')!;
    this.episode_id = this.activatedRoute.snapshot.paramMap.get('episode_id')!;
    this.userId = this.authService.getAuthenticatedUserId();

    console.log("activeUser - ", this.userId)
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

  delete(id: number) {
    this.commentService.delete(id).subscribe(_ => this.commentService.episodeCommentsUpdate.next(),
    )
  }
}
