import {Injectable} from "@angular/core";
import {HttpService} from "../../../core/http.service";
import {Story} from "../models/story.model";
import {Observable, of} from "rxjs";
import {EndPoints} from "../../../shared/end-points";

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
    return this.httpService
      .get(EndPoints.STORIES);
  }
}
