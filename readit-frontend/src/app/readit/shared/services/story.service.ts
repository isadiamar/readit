import {Injectable} from "@angular/core";
import {HttpService} from "../../../core/http.service";
import {Story} from "../models/story.model";
import {Observable, of} from "rxjs";
import {EndPoints} from "../../../shared/end-points";
import {Genre} from "../models/genre.enum";
import {Privacy} from "../models/privacy.enum";
import {Status} from "../models/status.enum";

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

  get(id:number):Observable<Story>{
    return this.httpService
      .successful()
      .get(EndPoints.STORIES + '/' + id);
  }

  getAll():Observable<Story[]>{
    return of([
      {title:'First', description:"This is a first description",  genre1: Genre.COMEDY , genre2:Genre.DRAMA, privacy:Privacy.PUBLIC, status:Status.COMPLETE, username: 'Laura'},
      {title:'Seconds', description:"This is a second a description",  genre1: Genre.DRAMA , genre2:Genre.ROMANCE, privacy:Privacy.PUBLIC, status:Status.COMPLETE, username: 'Laura'},

  ]);

}
}
