import {Injectable} from "@angular/core";
import {HttpService} from "../../../core/http.service";
import {Observable} from "rxjs";
import {Story} from "../models/story.model";
import {EndPoints} from "../../../shared/end-points";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private httpService: HttpService) {
  }

  findFavouritesByUser(userId: number):Observable<Story[]> {
    return this.httpService
      .get(EndPoints.USERS + "/favouriteStories" + "?userId=" + userId)
  }

  findStoryList(userId: number):Observable<Story[]>{
    return this.httpService
      .get(EndPoints.USERS + "/storyList" + "?userId=" + userId)
  }
}
