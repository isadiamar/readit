import {NgModule} from "@angular/core";

import {SharedModule} from "../shared/shared.module";
import {ReaditRoutingModule} from "./readit-routing.module";

import {LoginFormComponent} from "./welcome/forms/login-form/login-form.component";
import {WelcomeInfoComponent} from "./welcome/components/welcome-info/welcome-info.component";
import {RegisterFormComponent} from "./welcome/forms/register-form/register-form.component";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {WelcomeMenuComponent} from "./welcome/components/welcome-menu/welcome-menu.component";

import {DataService} from "./shared/services/data.service";
import {ReaditComponent} from "./readit.component";
import {StoryFormComponent} from './stories/story-form/story-form.component';
import {StoryComponent} from './stories/story/story.component';
import {StoryCoverComponent} from './stories/story-cover/story-cover.component';
import {EpisodeFormComponent} from './episodes/episode-form/episode-form.component';
import {StoryService} from "./shared/services/story.service";
import {EpisodeComponent} from './episodes/episode/episode.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {EpisodeCoverComponent} from './episodes/episode-cover/episode-cover.component';
import {CommentFormComponent} from './comments/comment-form/comment-form.component';
import {CommentComponent} from './comments/comment/comment.component';
import {GenreComponent} from './genres/genres/genre.component';
import {GenreCoverComponent} from './genres/genre-cover/genre-cover.component';
import {ReadComponent} from './read/read/read.component';
import {UserComponent} from './users/user/user.component';
import {UserFavouritesComponent} from './users/user-favourites/user-favourites.component';
import {UserStoriesComponent} from './users/user-stories/user-stories.component';
import {DescriptionComponent} from './users/description/description.component';
import {UserDasboardComponent} from './users/user-dasboard/user-dasboard.component';
import {UserHeaderComponent} from './users/user-header/user-header.component';
import {UserFormComponent} from './users/user-form/user-form.component';
import {EpisodeService} from "./shared/services/episode.service";
import {LikeService} from "./shared/services/like.service";
import {CommentService} from "./shared/services/comment.service";
import {UserService} from "./shared/services/user.service";


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
    UserComponent,
    UserFavouritesComponent,
    UserStoriesComponent,
    DescriptionComponent,
    UserDasboardComponent,
    UserHeaderComponent,
    UserFormComponent
  ],
  entryComponents: [],
  imports: [
    SharedModule,
    ReaditRoutingModule,
    PdfViewerModule,
  ],

  providers: [DataService, StoryService, EpisodeService, LikeService, CommentService, UserService],
})

export class ReaditModule {
}
