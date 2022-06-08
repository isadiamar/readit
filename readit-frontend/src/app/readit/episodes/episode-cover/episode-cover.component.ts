import {Component, Input, OnInit} from '@angular/core';
import {Episode} from "../../shared/models/episode.model";
import {EpisodeService} from "../../shared/services/episode.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../core/auth.service";

@Component({
  selector: 'app-episode-cover',
  templateUrl: './episode-cover.component.html',
  styleUrls: ['./episode-cover.component.css']
})
export class EpisodeCoverComponent implements OnInit {

  @Input() cover: string;
  activeUser: boolean;
  episodes: Episode[] = [];
  pathId: string;

  constructor(private episodeService: EpisodeService, private activatedRoute: ActivatedRoute, private router: Router, private dialog: MatDialog, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.pathId = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.episodeService.getAll(+this.pathId).subscribe(res => {
      this.episodes = res;
      this.activeUser = this.episodes.length > 0 && this.authService.getAuthenticatedUserId() === this.episodes[0].userId;
    })
  }

  update($event: MouseEvent,id: number) {
    $event.stopPropagation()
    this.router.navigate(["/stories/" + this.pathId + "/episodes/edit/" + id])
  }

  delete($event: MouseEvent, id: number) {
    $event.stopPropagation()
    this.dialog.open(ConfirmationDialogComponent, {data: {storyId: +this.pathId, episodeId: id, type: 'episode'}});
  }

  open(id: number) {
    this.episodeService.get(+this.pathId, id).subscribe(() => this.router.navigate(['stories/' + this.pathId + '/episodes/' + id]));
  }
}
