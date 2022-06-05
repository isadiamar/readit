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
import {StoryFormComponent} from './stories/story-form/story-form.component';
import {StoryComponent} from './stories/story/story.component';
import {StoryCoverComponent} from './stories/story-cover/story-cover.component';
import {EpisodeFormComponent} from './episodes/episode-form/episode-form.component';
import {StoryService} from "./shared/services/story.service";
import {EpisodeComponent} from './episodes/episode/episode.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {EpisodeCoverComponent} from './episodes/episode-cover/episode-cover.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { CommentComponent } from './comments/comment/comment.component';
import { GenreComponent } from './genres/genres/genre.component';
import { GenreCoverComponent } from './genres/genre-cover/genre-cover.component';
import { ReadComponent } from './read/read/read.component';


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
    EpisodeFormComponent,
    EpisodeComponent,
    EpisodeCoverComponent,
    CommentFormComponent,
    CommentComponent,
    GenreComponent,
    GenreCoverComponent,
    ReadComponent,
  ],
  entryComponents: [],
  imports: [
    SharedModule,
    ReaditRoutingModule,
    PdfViewerModule,
  ],

  providers: [WelcomeService, StoryService],
})

export class ReaditModule {
}
