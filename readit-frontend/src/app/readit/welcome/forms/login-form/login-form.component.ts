import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {DataService} from "../../../shared/services/data.service";
import {AuthService} from "../../../../core/auth.service";
import {Router} from "@angular/router";


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
    private data: DataService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$")]),
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
    this.submitDisabled = email === '' || password === '' || !this.loginForm.valid;
  }

  submit() {
    if (this.loginForm.valid) {
      let email = this.loginForm.controls['email'].value;
      let password = this.loginForm.controls['password'].value;
      this.authService.login(email, password).subscribe(
        next => console.log("Success"),
        error => this.clearFields(),
        () => this.router.navigate(["read"])
      )
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
