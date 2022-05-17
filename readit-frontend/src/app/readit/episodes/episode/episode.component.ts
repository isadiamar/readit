import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-episode',
  template:  `<pdf-viewer [src]="pdfSrc"
    [render-text]="true"
    [original-size]="false"
  style="width: 70%; height: 100vh;"
  ></pdf-viewer>`
})
export class EpisodeComponent implements OnInit {
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor() { }

  ngOnInit(): void {
  }

}
