import {Component, OnInit} from '@angular/core';
import {Status} from "../../shared/models/status.enum";
import {StoryService} from "../../shared/services/story.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Genre} from "../../shared/models/genre.enum";
import {AuthService} from "../../../core/auth.service";
import {Story} from "../../shared/models/story.model";
import {LikeService} from "../../shared/services/like.service";
import {Like} from "../../shared/models/like.model";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  isFavorite: boolean = false;
  title: string;
  description: string;
  color: string;
  status: Status;
  id: string;
  author: string | undefined
  cover: string;
  genre1: Genre;
  genre2: Genre;
  activeUser: boolean;
  userId: number | undefined;

  stories: Story[] = [];

  likes: number;

  constructor(private storyService: StoryService, private route: ActivatedRoute,
              private router: Router, private authService: AuthService, private likeService: LikeService) {
  }

  ngOnInit(): void {
    this.id = <string>this.route.snapshot.paramMap.get('id')

    this.storyService.get(+this.id).subscribe(res => {
      this.activeUser = this.authService.getAuthenticatedUserId() === res.userId;
      this.userId = res.userId;
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

    this.likeService.getAll(+this.id).subscribe(res => {
        this.likes = res.numberLikes!
      }
    )
    this.likeService.storyLikesUpdate.subscribe(() => {
      this.likeService.getAll(+this.id).subscribe(res => {
        this.likes = res.numberLikes!;
      });
    });

    this.likeService.isLiked(parseInt(this.id), this.authService.getAuthenticatedUserId()).subscribe((isLiked) => {
      this.isFavorite = isLiked;
    })
  }

  setFavorite() {
    this.isFavorite = !this.isFavorite;
    let like: Like = this.createLike();
    if (this.isFavorite) {
      this.likeService.create(like).subscribe(res => {
        this.likeService.storyLikesUpdate.next();
      })
    } else {
      this.likeService.delete(parseInt(this.id), this.authService.getAuthenticatedUserId()).subscribe(_ => this.likeService.storyLikesUpdate.next())
    }
  }

  update() {
    this.router.navigate(['stories/edit/' + +this.id]);
  }

  redirect(route: string) {
    this.router.navigate([route])
  }

  private createLike() {
    return {storyId: +this.id}
  }
}
