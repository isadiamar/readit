import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent implements OnInit {

  constructor(fb:FormBuilder) {
  }

  ngOnInit(): void {
  }

  upload(event:Event){
    console.log(event)
  }

}
