import {Injectable} from "@angular/core";
import {HttpService} from "../../../core/http.service";
import {Story} from "../models/story.model";
import {Observable, of} from "rxjs";
import {EndPoints} from "../../../shared/end-points";
import {Privacy} from "../models/privacy.enum";
import {Status} from "../models/status.enum";
import {Genre} from "../models/genre.enum";

@Injectable({
  providedIn: 'root',
})
export class StoryService{

  constructor(private httpService:HttpService) {
  }

  create(story:Story):Observable<Story>{
    return this.httpService
      .successful()
      .post(EndPoints.STORIES + '/new', {...story})
  }

  get():Observable<Story>{
       let story:Story = {
       title: "Title",
       description: "Description",
       genre1:Genre.COMEDY,
       genre2:Genre.ROMANCE,
       privacy:Privacy.PUBLIC,
       status:Status.COMPLETE, }

    return of(story);
  }
}
