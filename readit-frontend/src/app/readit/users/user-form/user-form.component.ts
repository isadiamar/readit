import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm:FormGroup;
  submitDisabled: boolean = true;

  userId:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<UserFormComponent>, private formBuilder: FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      nickname: new FormControl('', [Validators.required]),
      description: new FormControl('' , [Validators.maxLength(400)])
    });
    this.userForm.valueChanges.subscribe(_ => {
      this.checkDisabled();
    });
  }

  checkDisabled(): void {
    this.submitDisabled =  !this.userForm.valid;
  }

  submit() {
    if (this.userForm.valid) {
      let nickname = this.userForm.controls['nickname'].value;
      let description = this.userForm.controls['description'].value;
      let user:User= {nickname, description};

      this.userService.update(this.data.userId, user).subscribe(res => {
        this.dialogRef.close({ data: {nickname:nickname, description:description} });
      });
    }
  }
}
