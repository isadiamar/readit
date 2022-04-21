import {NgModule} from "@angular/core";

import {SharedModule} from "../shared/shared.module";
import {ReaditRoutingModule} from "./readit-routing.module";

import {LoginFormComponent} from "./login-form/login-form.component";
import {WelcomeInfoComponent} from "./welcome/welcome-info/welcome-info.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {WelcomeMenuComponent} from "./welcome/welcome-menu/welcome-menu.component";

import {WelcomeService} from "./shared/services/data.service";
import {ReaditComponent} from "./readit.component";


@NgModule({
  declarations: [
    ReaditComponent,
    LoginFormComponent,
    WelcomeInfoComponent,
    RegisterFormComponent,
    MainMenuComponent,
    WelcomeComponent,
    WelcomeMenuComponent
  ],
  entryComponents: [],
  imports: [
    SharedModule,
    ReaditRoutingModule,
  ],

  providers: [WelcomeService],
})

export class ReaditModule {
}
