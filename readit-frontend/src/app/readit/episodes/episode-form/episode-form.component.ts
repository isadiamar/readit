import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Episode} from "../../shared/models/episode.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EpisodeService} from "../../shared/services/episode.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-episode-form',
  templateUrl: './episode-form.component.html',
  styleUrls: ['./episode-form.component.css']
})
export class EpisodeFormComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;

  formNewEpisode: FormGroup;
  submitDisabled: boolean = true;
  fileToUpload:string;
  showFile:boolean = false;
  id: number | undefined;
  file_name: string;
  file: any;
  pdf: any;
  pathId:string;

  constructor(
    private formBuilder: FormBuilder,
    private episodeService: EpisodeService,
    private activeRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.pathId = this.activeRoute.snapshot.paramMap.get('id')!;

    this.formNewEpisode = this.formBuilder.group({
      title: new FormControl("", [Validators.minLength(3)])
    });
    this.formNewEpisode.valueChanges.subscribe(_ => this.checkDisabled())
  }

  private checkDisabled() {
    let title = this.formNewEpisode.controls['title'].value;

    this.submitDisabled = !title || this.formNewEpisode.invalid || !this.file;
  }

  submit() {
    if (this.formNewEpisode.valid) {
      let episode: Episode = this.createEpisode();
      console.log( episode)
      this.episodeService.create(episode).subscribe(
        next => this.id = next.id,
        error => this.clearFields(),
        ()=> this.router.navigate(['stories/'+this.pathId+'/episodes/'+ this.id])
      )
      this.clearFields()
    }
  }

  createEpisode():Episode{
      return {
        title:this.formNewEpisode.controls['title'].value,
        pdf:this.pdf,
        story_id:+this.pathId,
      }
  }

  clearFields() {
    this.formNewEpisode.reset();
    Object.keys(this.formNewEpisode.controls).forEach(key => {
      this.formNewEpisode.get(key)?.setErrors(null);
    })
  }

  onFileDropped($event: any) {
    this.file = $event[0];
    console.log(this.file)
    this.prepareFilesList(this.file);
  }

  fileBrowseHandler(event: any) {
    this.file = event.target.files[0];
    this.prepareFilesList(this.file);
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  prepareFilesList(file: any) {
    const reader = new FileReader();
    reader.onload = (_event: any) => {
      this.pdf = _event.target.result;
    };
    reader.readAsDataURL(this.file);

    this.checkDisabled()
    file.progress = 0;

    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.file.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.file.progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.file.progress += 20;
          }
        }, 200);
      }
    }, 200);
  }

  deleteFile() {
      this.file = null;
      this.checkDisabled()
  }
}
