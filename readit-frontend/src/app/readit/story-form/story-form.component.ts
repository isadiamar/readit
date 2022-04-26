import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent implements OnInit {
  formNewStory: FormGroup;
  selectedFile:string = "";
  submitDisabled:boolean = true;
  genre1Control= new FormControl('romance');
  genre2Control= new FormControl('romance');
  privacyControl = new FormControl('public');
  statusControl = new FormControl('progress');

  constructor(private formBuilder:FormBuilder) {
  }

  ngOnInit(): void {
    this.formNewStory = this.formBuilder.group({
      title: new FormControl('', [Validators.minLength(3)]),
      description: new FormControl('', [Validators.minLength(15)]),
      genre1 : this.genre1Control,
      genre2 : this.genre2Control,
      privacy:this.privacyControl,
      status:this.statusControl,
      color: new FormControl(''),
      cover: new FormControl('')
    })

    this.formNewStory.valueChanges.subscribe(_ => this.checkDisabled())
  }

  upload(event:Event){
    console.log(this.submitDisabled);
    let pathName:String = this.formNewStory.controls['cover'].value
    const arrPath = pathName.split("\\");
    this.selectedFile = arrPath[arrPath.length - 1];
  }

  checkDisabled(): void {
    let title = this.formNewStory.controls['title'].value;
    let description = this.formNewStory.controls['description'].value;

    this.submitDisabled = title === '' || description === '' || this.formNewStory.invalid ;
  }

  submit() {
    console.log(this.formNewStory)
  }

  clearFields() {
    this.formNewStory.reset();
  }
}
