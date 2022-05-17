import {Injectable} from "@angular/core";
import {HttpService} from "../../../core/http.service";
import {Observable, of} from "rxjs";
import {Episode} from "../models/episode.model";

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {

  constructor(private httpService: HttpService) {

  }

  create(episode:Episode):Observable<Episode>{
    console.log(episode)
    return of({id:2, title:"", pdf:""})
  }


}
