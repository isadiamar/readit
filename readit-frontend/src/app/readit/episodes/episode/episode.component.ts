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

  constructor(private  episodeService:EpisodeService,
              private storyService:StoryService,
              private activeRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.story_id = this.activeRoute.snapshot.paramMap.get('story_id')!;
    this.episode_id = this.activeRoute.snapshot.paramMap.get('episode_id')!;
  console.log('ep', this.episode_id)
    this.storyService.get(+this.story_id).subscribe(res =>{
      this.story_name = res.title
    })
    this.episodeService.get(+this.story_id, +this.episode_id).subscribe(res =>{
     this.pdfSrc = res.pdf ? res.pdf : "";
     this.episode_name = res.title;
    })
  }

  @ViewChild(PdfViewerComponent, { static: false })
  private pdfComponent: PdfViewerComponent;

  initLoadCompleted(pdf: PDFDocumentProxy): void {
    console.log(this.pdfComponent.pdfViewer);
    this.pdfComponent.pdfViewer.scroll.d
  }

  nextEpisode() {
    console.log('NEXT')
  }

  previousEpisode() {
    console.log('PREV')
  }

  showComments() {
    console.log('COMMENTS')
  }

  backToStory() {
    this.router.navigate(['stories/' + this.story_id])
  }
}
