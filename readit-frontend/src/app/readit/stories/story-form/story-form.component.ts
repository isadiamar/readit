import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StoryService} from "../../shared/services/story.service";
import {Story} from "../../shared/models/story.model";
import {Genre} from "../../shared/models/genre.enum";
import {Status} from "../../shared/models/status.enum";
import {Privacy} from "../../shared/models/privacy.enum";
import {Utils} from "../../shared/utils/Utils";

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent implements OnInit {
  formNewStory: FormGroup;
  selectedFile:string = "";
  submitDisabled:boolean = true;
  genres = Genre;
  status =  Status;
  privacies =  Privacy;

  constructor(
    private formBuilder:FormBuilder,
    public storyService:StoryService,
    ) {
  }

  ngOnInit(): void {
    this.formNewStory = this.formBuilder.group({
      title: new FormControl('', [Validators.minLength(3)]),
      description: new FormControl('', [Validators.minLength(15)]),
      genre1 : new FormControl(Utils.getEnumKeyByValue(Genre, Genre.ROMANCE)),
      genre2 : new FormControl(Utils.getEnumKeyByValue(Genre, Genre.COMEDY)),
      privacy: new FormControl(Utils.getEnumKeyByValue(Privacy, Privacy.PUBLIC)),
      status: new FormControl(Utils.getEnumKeyByValue(Status, Status.IN_PROGRESS)),
      color: new FormControl(''),
      cover: new FormControl('')
    })

    this.formNewStory.valueChanges.subscribe(_ => this.checkDisabled())
  }

  upload(event:Event){
    let pathName:String = this.formNewStory.controls['cover'].value
    const arrPath = pathName.split("\\");
    this.selectedFile = arrPath[arrPath.length - 1];
  }

  checkDisabled(): void {
    let title = this.formNewStory.controls['title'].value;
    let description = this.formNewStory.controls['description'].value;

    this.submitDisabled = !title || !description || this.formNewStory.invalid ;
  }

  submit() {
    if(this.formNewStory.valid){
      let story:Story = this.createStory();
      this.storyService.create(story).subscribe(res => {
        console.log(res);
      });
      this.clearFields()
    }
  }

  clearFields() {
    this.formNewStory.reset();
  }

  private createStory():Story {
    let title = this.formNewStory.controls['title'].value;
    let description = this.formNewStory.controls['description'].value;
    let genre1 = this.formNewStory.controls['genre1'].value;
    let genre2 = this.formNewStory.controls['genre2'].value;
    let privacy = this.formNewStory.controls['privacy'].value;
    let status =  this.formNewStory.controls['status'].value;
    let color =  this.formNewStory.controls['color'].value;
    let cover =  this.formNewStory.controls['cover'].value;

    return {title, description, genre1, genre2, privacy, status, color, cover}
  }


}
