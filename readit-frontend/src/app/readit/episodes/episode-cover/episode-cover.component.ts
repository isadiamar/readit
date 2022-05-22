import {Component, Input, OnInit} from '@angular/core';
import {Episode} from "../../shared/models/episode.model";
import {EpisodeService} from "../../shared/services/episode.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-episode-cover',
  templateUrl: './episode-cover.component.html',
  styleUrls: ['./episode-cover.component.css']
})
export class EpisodeCoverComponent implements OnInit {

  @Input() cover:string;
   a:boolean;
  episodes: Episode[] = [];
  pathId:string;

  constructor(private episodeService:EpisodeService, private activatedRoute:ActivatedRoute, private router:Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.a = true;
    this.pathId = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.episodeService.getAll(+this.pathId).subscribe(res =>{
      this.episodes = res;
    })

  }

  update(id:number) {
    this.router.navigate(["/stories/"+ this.pathId + "/episodes/edit/"+ id])
  }

  delete(id:number) {
    console.log('deleteId'+ id)
    this.dialog.open(ConfirmationDialogComponent, {data: {storyId:+this.pathId, episodeId:id, type:'episode'}});
  }
}
