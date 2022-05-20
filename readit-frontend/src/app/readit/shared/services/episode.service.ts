import {Injectable} from "@angular/core";
import {HttpService} from "../../../core/http.service";
import {Observable, of} from "rxjs";
import {Episode} from "../models/episode.model";
import {EndPoints} from "../../../shared/end-points";

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {

  constructor(private httpService: HttpService) {

  }

  create(episode:Episode):Observable<Episode>{
    return this.httpService
      .successful()
      .post(EndPoints.EPISODES + '/new', {...episode})
  }

  get(story_id:number, episode_id:number){
    return this.httpService
      .successful()
      .get(EndPoints.EPISODES +'/' + episode_id + '/from/' + story_id)
  }


}
