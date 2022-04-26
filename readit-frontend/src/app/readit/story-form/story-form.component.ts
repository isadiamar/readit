import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent implements OnInit {
  formNewStory: FormGroup;
  selectedFile:string = "";
  genre1Control= new FormControl('romance');
  genre2Control= new FormControl('romance');
  privacyControl = new FormControl('public');
  statusControl = new FormControl('progress');

  constructor(fb:FormBuilder) {
    this.formNewStory = fb.group({
      title: new FormControl(''),
      description: new FormControl(''),
      genre1 : this.genre1Control,
      genre2 : this.genre2Control,
      privacy:this.privacyControl,
      status:this.statusControl,
      color: new FormControl(''),
      cover: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  upload(event:Event){
    console.log(event);
    let pathName:String = this.formNewStory.controls['cover'].value
    const arrPath = pathName.split("\\");
    this.selectedFile = arrPath[arrPath.length - 1];
  }

  submit() {
    console.log(this.formNewStory)
  }

  clearFields() {
    this.formNewStory.reset();
  }
}
