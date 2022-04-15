import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {WelcomeService} from "../shared/services/data.service";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitDisabled: boolean = true;
  message: string;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public data: WelcomeService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.loginForm.valueChanges.subscribe(_ => {
      this.checkDisabled();
    });
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  checkDisabled(): void {
    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;
    this.submitDisabled = email === '' || password === '';
  }

  submit() {
    if (this.loginForm.valid) {
      let message = 'Logged succesfully';
      let action = 'close'
      this._snackBar.open(message, action, {
        duration: 1000
      });

      this.clearFields()
    }
  }

  clearFields() {
    this.loginForm.reset();
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.setErrors(null);
    })
  }

  newMessage(message: string) {
    this.data.changeMessage(message);

  }
}
