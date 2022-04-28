import {RegisterDto} from "./register.model";
import {HttpService} from "./http.service";
import {Router} from "@angular/router";
import {map, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Token} from "../readit/shared/models/token.model";
import {User} from "./User";

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
    const token = localStorage.getItem("token");
    return token !== null && token !== undefined && token!=='';
  }
}
