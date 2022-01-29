import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from "rxjs";
import {WelcomeService} from "../shared/services/data.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit, OnDestroy{
  registerForm: FormGroup;
  submitDisabled: boolean = true;
  message:string;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public data: WelcomeService
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    });

    this.registerForm.valueChanges.subscribe(_ => {
      this.checkDisabled()
    });

    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  checkDisabled(): void {
    let username = this.registerForm.controls['username'].value;
    let email = this.registerForm.controls['email'].value;
    let password = this.registerForm.controls['password'].value;
    let confirmPassword = this.registerForm.controls['confirmPassword'].value;
    this.submitDisabled = username === '' || email === '' || password === '' || confirmPassword === '';
  }

  validatePassword(): void {
    let password = this.registerForm.controls['password'].value;
    let confirmPassword = this.registerForm.controls['confirmPassword'].value;
    if (password !== confirmPassword) {
      this.registerForm.controls['confirmPassword'].setErrors({'nomatch': true});
    }
  }

  submit() {
    this.validatePassword();
    if (this.registerForm.valid) {
      let message = 'User created succesfully';
      let action = 'close'
      this._snackBar.open(message, action, {
        duration: 1000
      });

      this.clearFields()
    }
  }

  clearFields() {
    this.registerForm.reset();
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key)?.setErrors(null);
    })
  }


  newMessage(message: string) {
    this.data.changeMessage(message);

  }
}
