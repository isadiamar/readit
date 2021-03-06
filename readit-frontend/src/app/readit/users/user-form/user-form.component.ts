import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  submitDisabled: boolean = true;

  userId: string;
  nickname: string;
  description: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<UserFormComponent>,
              private formBuilder: FormBuilder, private userService: UserService, private activatedRouter: ActivatedRoute) {

    this.userForm = this.formBuilder.group({
      nickname: new FormControl(this.nickname, [Validators.required]),
      description: new FormControl(this.description, [Validators.maxLength(500)])
    });
  }

  ngOnInit(): void {
    this.userService.get(+this.data.userId).subscribe(res => {
      this.nickname = res.nickname!;
      this.description = res.description;
      this.userForm = this.formBuilder.group({
        nickname: new FormControl(this.nickname, [Validators.required]),
        description: new FormControl(this.description, [Validators.maxLength(500)])
      });
      this.userForm.valueChanges.subscribe(_ => {
        this.checkDisabled();
      });
    })
  }

  checkDisabled(): void {
    this.submitDisabled = !this.userForm.valid;
  }

  submit() {
    if (this.userForm.valid) {
      let nickname = this.userForm.controls['nickname'].value;
      let description = this.userForm.controls['description'].value;
      let user: User = {nickname, description};

      this.userService.update(this.data.userId, user).subscribe(res => {
        this.dialogRef.close({data: {nickname: nickname, description: description}});
      });
    }
  }
}
