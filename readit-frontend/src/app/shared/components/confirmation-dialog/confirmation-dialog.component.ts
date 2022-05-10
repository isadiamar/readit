import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {StoryService} from "../../../readit/shared/services/story.service";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id:number},
    private dialog: MatDialog,
    private storyService: StoryService
  ) { }

  deleteStory(){
    this.storyService.delete(this.data.id).subscribe(() => window.location.reload());
  }
}
