import {RegisterDto} from "./register.model";
import {HttpService} from "./http.service";
import {map, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Token} from "../readit/shared/models/token.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService{

  static REST_BACK = "http://localhost:8080";
  static LOGIN = "/api/auth/login";
  static REGISTER="/api/auth/register";

  constructor(private httpService: HttpService) {}

  login(email: string, password: string): Observable<Token> {
    return this.httpService
      .successful()
      .post(AuthService.REST_BACK + AuthService.LOGIN, {email, password}).pipe(map(res => {
        localStorage.setItem('token', res.token);
        return res;
      }))
  }

  register(user:RegisterDto): Observable<Token> {
    return this.httpService
      .successful()
      .post(AuthService.REST_BACK + AuthService.REGISTER, {...user}).pipe(map(res => {
        localStorage.setItem('token', res.token);
        return res;
      }));
  }

  isAuthenticated():boolean{
    let res = false;
    const token = localStorage.getItem("token");

    if ((token !== null && token !== undefined && token!=='')) {
      const expireAt = JSON.parse(window.atob(token.split('.')[1])).exp
      if (expireAt <= (Date.now() / 1000)) {
        localStorage.removeItem("token");
        res = false;
      } else {
        res = true;
      }
    }

    return res;
  }
}
