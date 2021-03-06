import {Injectable} from "@angular/core";
import {HttpService} from "../../../core/http.service";
import {Observable} from "rxjs";
import {Story} from "../models/story.model";
import {EndPoints} from "../../../shared/end-points";

@Injectable({
  providedIn: 'root',
})
export class FilterService {

  constructor(private httpService: HttpService) {
  }

  findByGenre(genre: string): Observable<Story[]> {
    return this.httpService
      .get(EndPoints.STORIES + "/filter" + "?genre=" + genre);
  }

  findByGenreAndStatus(genre: string, status: string): Observable<Story[]> {
    return this.httpService
      .get(EndPoints.STORIES + "/filter/status" + "?genre=" + genre + "&status=" + status);
  }

  sortByPopularity(genre: string): Observable<Story[]> {
    return this.httpService
      .get(EndPoints.STORIES + "/sort" + "?genre=" + genre);
  }

  findByNewness(): Observable<Story[]> {
    return this.httpService
      .get(EndPoints.STORIES + "/newness");
  }

  findByPopularity(): Observable<Story[]> {
    return this.httpService
      .get(EndPoints.STORIES + "/filter/popularity");
  }

}
