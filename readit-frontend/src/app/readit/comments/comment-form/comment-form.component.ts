import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../shared/services/comment.service";
import {Comment} from "../../shared/models/comment.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  commentForm: FormGroup;
  submitDisabled: boolean = true;

  episode_id: string;

  constructor(private formBuilder: FormBuilder, private commentService: CommentService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let storyId = this.activatedRoute.snapshot.paramMap.get('story_id')!;

    this.episode_id = this.activatedRoute.snapshot.paramMap.get('episode_id')!;

    this.commentForm = this.formBuilder.group({
      description: new FormControl("", [Validators.minLength(5)]),
    });
    this.commentForm.valueChanges.subscribe(_ => this.checkDisabled())
  }

  submit() {
    if (this.commentForm.valid) {
      let comment: Comment = this.createComment();
      this.commentService.create(comment).subscribe(
        next => this.commentService.episodeCommentsUpdate.next(),
        error => this.clearFields(),
        () => console.log("ok")
      )
      this.clearFields()
    }
  }

  private checkDisabled() {
    let description = this.commentForm.controls['description'].value;

    this.submitDisabled = !description || this.commentForm.invalid;
  }

  private createComment(): Comment {
    return {description: this.commentForm.controls['description'].value, episodeId: +this.episode_id};
  }

  private clearFields() {
    this.commentForm.reset();
    Object.keys(this.commentForm.controls).forEach(key => {
      this.commentForm.get(key)?.setErrors(null);
    })

  }
}
