import {Component, OnInit, ViewChild} from '@angular/core';
import {EpisodeService} from "../../shared/services/episode.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PDFDocumentProxy, PdfViewerComponent} from "ng2-pdf-viewer";
import {StoryService} from "../../shared/services/story.service";

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {
  pdfSrc:string;
  story_id:string;
  episode_id:string;

  story_name:string;
  episode_name:string;
  numberEpisode:number;
  openComments:boolean = false;

  constructor(private  episodeService:EpisodeService,
              private storyService:StoryService,
              private activeRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.story_id = this.activeRoute.snapshot.paramMap.get('story_id')!;
    this.episode_id = this.activeRoute.snapshot.paramMap.get('episode_id')!;

    this.storyService.get(+this.story_id).subscribe(res =>{
      this.story_name = res.title
    })
    this.episodeService.get(+this.story_id, +this.episode_id).subscribe(res =>{
     this.pdfSrc = res.pdf ? res.pdf : "";
     this.episode_name = res.title;
     this.numberEpisode = res.numberEpisode;
    })
  }

  @ViewChild(PdfViewerComponent, { static: false })
  private pdfComponent: PdfViewerComponent;

  initLoadCompleted(pdf: PDFDocumentProxy): void {
    this.pdfComponent.pdfViewer.scroll.d
  }

  nextEpisode() {
    //num episode + 1 - busar episodio por numbero de episodio y por historia
    console.log('NEXT')
  }

  previousEpisode() {
    //num episode -1 - busar episodio por numbero de episodio y por historia
    console.log('PREV')
  }

  showComments() {
    this.openComments = !this.openComments;
  }

  backToStory() {
    this.router.navigate(['stories/' + this.story_id])
  }
}
