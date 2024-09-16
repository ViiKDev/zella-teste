import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  signUpActive: boolean = false;
  loginForm!: FormGroup;
  signUpForm!: FormGroup;
  actionInProgress: boolean = false;
  invalidForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) this.router.navigate(['home']);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', Validators.required]
    });
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', Validators.required]
    });
  }

  showPasswordClick(event: any) {
    this.showPassword = !this.showPassword;
    event.stopPropagation();
  }

  onSubmitLogin() {
    this.invalidForm = false;
    this.actionInProgress = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.actionInProgress = false;
            console.log(res.message);
            this.authService.storeToken(res.token);
            this.loginForm.reset();
            this.router.navigate(['home']);
          },
          error: (err) => {
            console.log(err.error.message);
            this.invalidForm = true;
            this.actionInProgress = false;
          }
        });
    } else {
      console.log("Form not valid");
      this.validateAllFormFields(this.loginForm);
    }
  }

  onSubmitSignUp() {
    this.invalidForm = false;
    this.actionInProgress = true;
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value)
        .subscribe({
          next: (res) => {
            this.actionInProgress = false;
            console.log(res.message);
            this.signUpForm.reset();
            this.signUpActive = false;
          },
          error: (err) => {
            this.invalidForm = true;
            this.actionInProgress = false;
            console.log(err.error.message);
          }
        });
    } else {
      console.log("Form not valid");
      this.validateAllFormFields(this.signUpForm);
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true })
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    })
  }

  handleSubmit() {
    if ((this.signUpForm.valid || this.signUpForm.valid) && !this.actionInProgress) {
      this.signUpActive ? this.onSubmitSignUp() : this.onSubmitLogin();
    }
  }
  changeForm() {
    this.invalidForm = false;
    if (this.signUpActive) { this.signUpForm.reset(); } else { this.loginForm.reset(); }
    this.signUpActive = !this.signUpActive;
  }
}
