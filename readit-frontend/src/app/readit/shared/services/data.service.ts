import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private messageSource = new BehaviorSubject('login');
  currentMessage = this.messageSource.asObservable();

  private descriptionSource = new BehaviorSubject('');
  descriptionMessage = this.descriptionSource.asObservable();

  constructor() {
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  saveDescription(description:string){
    this.descriptionSource.next(description);
  }

}
