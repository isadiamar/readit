import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Token} from "../readit/shared/models/token.model";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/welcome']);
      return false;
    }
    return true;
  }

}
