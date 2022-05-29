import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {StoryService} from "../../../readit/shared/services/story.service";
import {EpisodeService} from "../../../readit/shared/services/episode.service";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {storyId:number, episodeId?:number, type:string},
    private dialog: MatDialog,
    private storyService: StoryService,
    private episodeServoce:EpisodeService
  ) { }

  delete(){
    if (this.data.type == 'story'){
      this.storyService.delete(this.data.storyId).subscribe(() => window.location.reload());
    }
    else if (this.data.type == 'episode'){
      this.episodeServoce.delete(this.data.storyId, this.data.episodeId!).subscribe(()=> window.location.reload())
    }

  }
}
