import {Status} from "./status.enum";
import {Privacy} from "./privacy.enum";
import {Genre} from "./genre.enum";

export interface Story{
  title: string;
  description: string;
  genre1:Genre;
  genre2:Genre;
  privacy:Privacy;
  status:Status;
  cover?:File;
  color?:string;
}
