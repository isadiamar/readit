import {environment} from "../../environments/environment";

export class EndPoints{
  static BASE = environment.REST_CORE + '/api';
  static PUBLIC = EndPoints.BASE;
  static PRIVATE = EndPoints.BASE + '/private';
  static STORIES = EndPoints.PRIVATE + '/stories';
  static EPISODES = EndPoints.PRIVATE + '/episodes';
  static COMMENTS = EndPoints.PRIVATE + '/comments';
}
