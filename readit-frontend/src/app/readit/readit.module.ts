import {NgModule} from "@angular/core";

import {SharedModule} from "../shared/shared.module";
import {ReaditRoutingModule} from "./readit-routing.module";

import {LoginFormComponent} from "./welcome/forms/login-form/login-form.component";
import {WelcomeInfoComponent} from "./welcome/components/welcome-info/welcome-info.component";
import {RegisterFormComponent} from "./welcome/forms/register-form/register-form.component";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {WelcomeMenuComponent} from "./welcome/components/welcome-menu/welcome-menu.component";

import {WelcomeService} from "./shared/services/data.service";
import {ReaditComponent} from "./readit.component";
import { StoryFormComponent } from './stories/story-form/story-form.component';
import { StoryComponent } from './stories/story/story.component';
import { StoryCoverComponent } from './stories/story-cover/story-cover.component';


@NgModule({
  declarations: [
    ReaditComponent,
    LoginFormComponent,
    WelcomeInfoComponent,
    RegisterFormComponent,
    MainMenuComponent,
    WelcomeComponent,
    WelcomeMenuComponent,
    StoryFormComponent,
    StoryComponent,
    StoryCoverComponent,
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
