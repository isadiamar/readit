import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {WelcomeComponent} from "./welcome/welcome.component";

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'loginForm', component: LoginFormComponent},
  {path: 'registerForm', component: RegisterFormComponent},
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: '**', redirectTo: '/welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
