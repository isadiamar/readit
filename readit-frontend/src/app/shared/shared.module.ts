import {NgModule} from "@angular/core";

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from "./material.module";
import {EnumToArrayPipe} from "./pipes/enumToArray";
import {StoryHeaderComponent} from "./components/story-header/story-header.component";
import {ConfirmationDialogComponent} from "./components/confirmation-dialog/confirmation-dialog.component";
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {DndDirective} from "./directives/dnd/dnd.directive";
import {ProgressBarComponent} from "./components/progress-bar/progress-bar.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    PdfViewerModule
  ],
  declarations: [
    EnumToArrayPipe,
    StoryHeaderComponent,
    ConfirmationDialogComponent,
    DndDirective,
    ProgressBarComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    EnumToArrayPipe,
    StoryHeaderComponent,
    ConfirmationDialogComponent,
    DndDirective,
    ProgressBarComponent,
  ],

  entryComponents: []
})
export class SharedModule {

}
