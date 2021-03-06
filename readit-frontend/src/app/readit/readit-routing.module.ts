import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {ReaditComponent} from "./readit.component";
import {StoryFormComponent} from "./stories/story-form/story-form.component";
import {AuthGuardService} from "../core/authGuard.service";
import {StoryComponent} from "./stories/story/story.component";
import {EpisodeFormComponent} from "./episodes/episode-form/episode-form.component";
import {EpisodeComponent} from "./episodes/episode/episode.component";
import {GenreComponent} from "./genres/genres/genre.component";
import {ReadComponent} from "./read/read/read.component";
import {UserComponent} from "./users/user/user.component";
import {UserDasboardComponent} from "./users/user-dasboard/user-dasboard.component";


const routes: Routes = [
  {
    path: '',
    component: ReaditComponent,
    children: [
      {path: 'welcome', component: WelcomeComponent},
      {path: 'genres', component: GenreComponent, canActivate: [AuthGuardService]},
      {path: 'read', component: ReadComponent, canActivate: [AuthGuardService]},
      {path: 'stories/new', component: StoryFormComponent, canActivate: [AuthGuardService]},
      {path: 'stories/edit/:id', component: StoryFormComponent, canActivate: [AuthGuardService]},
      {path: 'stories/dashboard', component: UserDasboardComponent, canActivate: [AuthGuardService]},
      {path: 'stories/:id', component: StoryComponent, canActivate: [AuthGuardService]},
      {path: 'stories/:id/episodes/new', component: EpisodeFormComponent, canActivate: [AuthGuardService]},
      {path: 'stories/:story_id/episodes/:episode_id', component: EpisodeComponent, canActivate: [AuthGuardService]},
      {path: 'stories/:id/episodes/edit/:episode_id', component: EpisodeFormComponent, canActivate: [AuthGuardService]},
      {path: 'users/:id', component: UserComponent, canActivate: [AuthGuardService]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReaditRoutingModule {

}
