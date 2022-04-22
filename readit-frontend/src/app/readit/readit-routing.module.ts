import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {LoginFormComponent} from "./welcome/forms/login-form/login-form.component";
import {RegisterFormComponent} from "./welcome/forms/register-form/register-form.component";
import {ReaditComponent} from "./readit.component";


const routes: Routes = [
  {
    path: '',
    component: ReaditComponent,
    children: [
      {path: 'welcome', component: WelcomeComponent},
      {path: 'loginForm', component: LoginFormComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReaditRoutingModule {

}
