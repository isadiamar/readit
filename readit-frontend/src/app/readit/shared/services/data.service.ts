import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WelcomeService {

  private messageSource = new BehaviorSubject('login');
  currentMessage = this.messageSource.asObservable();

  constructor() {
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

}
