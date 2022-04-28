import {environment} from "../../environments/environment";

export class EndPoints{
  static BASE = environment.REST_CORE + '/api/private';
  static STORIES = EndPoints.BASE + '/story';
}
