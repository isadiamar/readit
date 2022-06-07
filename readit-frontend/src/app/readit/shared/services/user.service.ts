import {Injectable} from "@angular/core";
import {HttpService} from "../../../core/http.service";
import {Observable} from "rxjs";
import {Story} from "../models/story.model";
import {EndPoints} from "../../../shared/end-points";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private httpService: HttpService) {
  }

  findFavouritesByUser(userId: number): Observable<Story[]> {
    return this.httpService
      .get(EndPoints.USERS + "/favouriteStories" + "?userId=" + userId)
  }

  findStoryList(userId: number): Observable<Story[]> {
    return this.httpService
      .get(EndPoints.USERS + "/storyList" + "?userId=" + userId)
  }

  update(id: number, user: User): Observable<User> {
    return this.httpService
      .put(EndPoints.USERS + "/update" + "?id=" + id, {...user})
  }

  get(userId: number): Observable<User> {
    return this.httpService
      .get(EndPoints.USERS + "?id=" + userId);
  }

  isStoryFromUser(userId: number, story_id: string): Observable<boolean> {
    return this.httpService
      .get(EndPoints.USERS + "/isStoryFromUser?userId=" + userId + "&storyId=" + story_id)

  }
}
