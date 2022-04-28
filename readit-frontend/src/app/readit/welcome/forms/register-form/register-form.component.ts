import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from "rxjs";
import {WelcomeService} from "../../../shared/services/data.service";
import {AuthService} from "../../../../core/auth.service";
import {RegisterDto} from "../../../../core/register.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitDisabled: boolean = true;
  message: string;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private data: WelcomeService,
    private authService:AuthService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$")]),
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
    this.submitDisabled = username === '' || email === '' || password === '' || confirmPassword === '' || this.registerForm.invalid;
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
      let registerDto:RegisterDto = this.createUser();
      this.authService.register(registerDto).subscribe(
        next => console.log("Success"),
        error => this.clearFields(),
        ()=> this.router.navigate(["myStories/new"])
      );
      this.clearFields()
    }
  }

  createUser():RegisterDto{
    let username = this.registerForm.controls['username'].value;
    let email = this.registerForm.controls['email'].value;
    let password = this.registerForm.controls['password'].value;
    let confirmPassword = this.registerForm.controls['confirmPassword'].value;

    return {nickname: username, email: email, password: password, confirmPassword: confirmPassword};
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
