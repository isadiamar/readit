import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {ReaditComponent} from "./readit.component";
import {StoryFormComponent} from "./story-form/story-form.component";


const routes: Routes = [
  {
    path: '',
    component: ReaditComponent,
    children: [
      {path: 'welcome', component: WelcomeComponent},
      {path: 'myStories/new', component: StoryFormComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReaditRoutingModule {

}
