import {RegisterDto} from "./register.model";
import {HttpService} from "./http.service";
import {Router} from "@angular/router";
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

  private user: RegisterDto;

  constructor(private httpService: HttpService, private router: Router) {

  }

  login(email: string, password: string): Observable<Token> {
    return this.httpService
      .post(AuthService.REST_BACK + AuthService.LOGIN, {email, password});
  }

  register(user:RegisterDto): Observable<Token> {
    return this.httpService
      .successful()
      .post(AuthService.REST_BACK + AuthService.REGISTER, {...user});
  }

}
