import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StoryService} from "../../shared/services/story.service";
import {Story} from "../../shared/models/story.model";
import {Genre} from "../../shared/models/genre.enum";
import {Status} from "../../shared/models/status.enum";
import {Privacy} from "../../shared/models/privacy.enum";
import {Utils} from "../../shared/utils/Utils";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent implements OnInit {
  formNewStory: FormGroup;
  submitDisabled: boolean = true;
  imageFile: { link: string, file: any, name: string };
  genres = Genre;
  status = Status;
  privacies = Privacy;
  filedata: any;
  id: number | undefined;
  pathId: string | null;

  constructor(
    private formBuilder: FormBuilder,
    public storyService: StoryService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.pathId = this.activeRoute.snapshot.paramMap.get('id');
    if (this.pathId) {
      this.storyService.get(+this.pathId).subscribe(res => {
        this.createForm(res.title, res.description, res.genre1, res.genre2, res.privacy, res.status, res.color)
      })
    } else {
      this.createForm('',
        '',
        Utils.getEnumKeyByValue(Genre, Genre.ROMANCE),
        Utils.getEnumKeyByValue(Genre, Genre.COMEDY),
        Utils.getEnumKeyByValue(Privacy, Privacy.PUBLIC),
        Utils.getEnumKeyByValue(Status, Status.IN_PROGRESS),
        '')
    }
  }

  createForm(title: string, description: string, genre1: string, genre2: string, privacy: string, status: string, color?: String) {
    this.formNewStory = this.formBuilder.group({
      title: new FormControl(title, [Validators.minLength(3)]),
      description: new FormControl(description, [Validators.minLength(15)]),
      genre1: new FormControl(genre1),
      genre2: new FormControl(genre2),
      privacy: new FormControl(privacy),
      status: new FormControl(status),
      color: new FormControl(''),
    })
    this.formNewStory.valueChanges.subscribe(_ => this.checkDisabled())
  }

  upload(event: any) {
    this.filedata = event.target.files;

    if (this.filedata && this.filedata[0]) {
      const reader = new FileReader();

      reader.onload = (_event: any) => {
        this.imageFile = {
          link: _event.target.result,
          file: event.target.files[0],
          name: event.target.files[0].name
        };
      };
      reader.readAsDataURL(this.filedata[0]);
    }
  }

  checkDisabled(): void {
    let title = this.formNewStory.controls['title'].value;
    let description = this.formNewStory.controls['description'].value;

    this.submitDisabled = !title || !description || this.formNewStory.invalid;
  }

  submit() {
    if (this.formNewStory.valid) {
      let story: Story = this.createStory();
      this.storyService.create(story).subscribe(
        next => this.id = next.id,
        error => this.clearFields(),
        () => this.router.navigate(["stories/" + this.id])
      );
      this.clearFields()
    }
  }

  clearFields() {
    this.formNewStory.reset();
    Object.keys(this.formNewStory.controls).forEach(key => {
      this.formNewStory.get(key)?.setErrors(null);
    })
  }

  private createStory(): Story {
    let id;
    (this.pathId) ? id = +this.pathId : undefined
    let title = this.formNewStory.controls['title'].value;
    let description = this.formNewStory.controls['description'].value;
    let genre1 = this.formNewStory.controls['genre1'].value;
    let genre2 = this.formNewStory.controls['genre2'].value;
    let privacy = this.formNewStory.controls['privacy'].value;
    let status = this.formNewStory.controls['status'].value;
    let color = this.formNewStory.controls['color'].value;
    let cover;
    (this.filedata) ? cover = this.filedata[0] : undefined

    return {id, title, description, genre1, genre2, privacy, status, color, cover}
  }

  edit() {
    if (this.formNewStory.valid) {
      let story: Story = this.createStory();
      this.storyService.update(story).subscribe(
        next => this.id = next.id,
        error => this.clearFields(),
        () => this.router.navigate(["stories/" + this.id])
      );
      this.clearFields()
    }
  }
}
