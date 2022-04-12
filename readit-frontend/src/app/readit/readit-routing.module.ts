import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {ReaditComponent} from "./readit.component";


const routes: Routes = [
  {
    path: '',
    component: ReaditComponent,
    children: [
      {path: 'welcome', component: WelcomeComponent},
      {path: 'loginForm', component: LoginFormComponent},
      {path: 'registerForm', component: RegisterFormComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReaditRoutingModule {

}
