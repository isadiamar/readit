import { Component, OnInit } from '@angular/core';
import {Episode} from "../../shared/models/episode.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EpisodeService} from "../../shared/services/episode.service";

@Component({
  selector: 'app-episode-form',
  templateUrl: './episode-form.component.html',
  styleUrls: ['./episode-form.component.css']
})
export class EpisodeFormComponent implements OnInit {
  formNewEpisode: FormGroup;
  submitDisabled: boolean = true;

  fileToUpload:string;
  showFile:boolean = false;
  id: number | undefined;
  file_name: string;

  constructor(
    private formBuilder: FormBuilder,
    private episodeService: EpisodeService
  ) { }

  ngOnInit(): void {
    this.formNewEpisode = this.formBuilder.group({
      title: new FormControl("", [Validators.minLength(3)])
    });
    this.formNewEpisode.valueChanges.subscribe(_ => this.checkDisabled())

  }

  private checkDisabled() {
    let title = this.formNewEpisode.controls['title'].value;

    this.submitDisabled = !title || this.formNewEpisode.invalid;
  }

  handleFileInput($event: any) {
    let input =  $event.target.files;

    if (input && input[0]) {
      const reader = new FileReader();

      reader.onload = (_event: any) => {
        this.fileToUpload = _event.target.result;
        this.file_name = $event.target.files[0].name
      };
      reader.readAsDataURL(input[0]);
    }
  }

  uploadFile() {
    this.showFile = true;
  }

  submit() {
    if (this.formNewEpisode.valid) {
      console.log(this.submitDisabled)
      let episode: Episode = this.createEpisode();
      console.log(episode)
      this.episodeService.create(episode).subscribe(
        next => this.id = next.id,
        error => this.clearFields(),
        ()=> console.log("Okey!")
      )
      this.clearFields()
    }
  }

  createEpisode():Episode{
    return {
      title:this.formNewEpisode.controls['title'].value,
      pdf:this.fileToUpload
    }
  }

  clearFields() {
    this.formNewEpisode.reset();
    Object.keys(this.formNewEpisode.controls).forEach(key => {
      this.formNewEpisode.get(key)?.setErrors(null);
    })
  }
}
