import {Injectable} from "@angular/core";
import {HttpService} from "../../../core/http.service";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {Comment} from "../models/comment.model";

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  episodeCommentsUpdate: Subject<void>;

  constructor(private httpService: HttpService) {
    this.episodeCommentsUpdate = new Subject<void>();
  }

  create(comment: Comment) :Observable<Comment>{
    return of(comment);
  }

  getAll():Observable<Comment[]>{
    return of([{id:2, username: "sebas", description: "aaaaaaaaaaaaaa", episodeId:5, storyId:25},
      {id:3, username: "xxSus", description: "bbbbbbbbbbbbbbbb", episodeId:5, storyId:25}])
  }

  getAll2():Observable<Comment[]>{
    return of([{id:2, username: "sebas", description: "aaaaaaaaaaaaaa", episodeId:5, storyId:25},
      {id:3, username: "xxSus", description: "bbbbbbbbbbbbbbbb", episodeId:5, storyId:25},
      {id:4, username: "kov0", description: "isa guapa", episodeId:5, storyId:25}])
  }
}
