import {Injectable} from "@angular/core";
import {HttpService} from "../../../core/http.service";
import {Observable, Subject} from "rxjs";
import {Comment} from "../models/comment.model";
import {EndPoints} from "../../../shared/end-points";

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  episodeCommentsUpdate: Subject<void>;

  constructor(private httpService: HttpService) {
    this.episodeCommentsUpdate = new Subject<void>();
  }

  create(comment: Comment): Observable<Comment> {
    return this.httpService
      .post(EndPoints.COMMENTS + "/new", {...comment})
  }

  getAll(episodeId: number): Observable<Comment[]> {
    return this.httpService
      .get(EndPoints.COMMENTS + '?episodeId=' + episodeId)
  }

  delete(id: number): Observable<void> {
    return this.httpService
      .delete(EndPoints.COMMENTS + '?commentId=' + id)
  }
}
