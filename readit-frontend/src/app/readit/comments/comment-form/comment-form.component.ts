import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../shared/services/comment.service";
import {Comment} from "../../shared/models/comment.model";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  commentForm: FormGroup;
  submitDisabled: boolean = true;

  comment: Comment[] = [];


  constructor(  private formBuilder: FormBuilder, private commentService:CommentService) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      description: new FormControl("", [Validators.minLength(5)]),
    });
    this.commentForm.valueChanges.subscribe(_ => this.checkDisabled())
  }

  private checkDisabled() {
    let description = this.commentForm.controls['description'].value;

    this.submitDisabled = !description || this.commentForm.invalid;
  }

  submit() {
    if (this.commentForm.valid) {
      let comment: Comment = this.createComment();
      this.commentService.create(comment).subscribe(
        next => this.commentService.episodeCommentsUpdate.next(),
        error => this.clearFields(),
        ()=> console.log("get all")
      )
      this.clearFields()
    }
  }

  private createComment():Comment {
    return {username: "sebas", description: "aaaaaaaaaaaaaa", episodeId:5, storyId:25};
  }

  private clearFields() {
    this.commentForm.reset();
    Object.keys(this.commentForm.controls).forEach(key => {
      this.commentForm.get(key)?.setErrors(null);
    })

  }
}
