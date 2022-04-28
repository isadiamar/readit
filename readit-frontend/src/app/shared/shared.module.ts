import {NgModule} from "@angular/core";

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from "./material.module";
import {EnumToArrayPipe} from "./pipes/enumToArray";
import {StoryHeaderComponent} from "./components/story-header/story-header.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [
    EnumToArrayPipe,
    StoryHeaderComponent,

  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    EnumToArrayPipe,
    StoryHeaderComponent
  ],

  entryComponents: []
})
export class SharedModule {

}
