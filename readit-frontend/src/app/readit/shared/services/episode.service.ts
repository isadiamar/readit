import {Injectable} from "@angular/core";
import {HttpService} from "../../../core/http.service";
import {Observable} from "rxjs";
import {Episode} from "../models/episode.model";
import {EndPoints} from "../../../shared/end-points";

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {

  constructor(private httpService: HttpService) {}

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

  getAll(story_id:number):Observable<Episode[]>{
    return this.httpService
      .get(EndPoints.EPISODES + '?storyId=' + story_id)
  }

  delete(story_id:number, episode_id: number):Observable<void> {
    return this.httpService
      .delete(EndPoints.EPISODES + '?storyId=' + story_id + '&'+ 'episodeId=' + episode_id)
  }

  update(storyId:number, episode:Episode):Observable<Episode>{
    return this.httpService
      .successful()
      .put(EndPoints.EPISODES + '?storyId=' + storyId + '&'+ 'episodeId=' + episode.id,  {...episode})
  }

  findEpisodeByStoryAndNumberEpisode(storyId:number, numberEpisode:number):Observable<Episode>{
    return this.httpService
      .get(EndPoints.EPISODES + "/numberEpisode?storyId="+storyId+"&numberEpisode="+numberEpisode)
  }
}
