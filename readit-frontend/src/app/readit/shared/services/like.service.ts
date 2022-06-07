import {Injectable} from "@angular/core";
import {HttpService} from "../../../core/http.service";
import {Observable, Subject} from "rxjs";
import {Like} from "../models/like.model";
import {EndPoints} from "../../../shared/end-points";

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  storyLikesUpdate: Subject<void>;

  constructor(private httpService: HttpService) {
    this.storyLikesUpdate = new Subject<void>()
  }

  create(like: Like): Observable<Like> {
    return this.httpService
      .post(EndPoints.LIKES + "/new", {...like})
  }

  delete(storyId: number, userId: number): Observable<void> {
    return this.httpService
      .delete(EndPoints.LIKES + "?storyId=" + storyId + "&userId=" + userId)
  }

  getAll(storyId: number): Observable<Like> {
    return this.httpService
      .get(EndPoints.LIKES + "?storyId=" + storyId)
  }

  isLiked(storyId: number, userId: number): Observable<boolean> {
    return this.httpService
      .get(EndPoints.LIKES + "/isliked?storyId=" + storyId + "&userId=" + userId)
  }
}
