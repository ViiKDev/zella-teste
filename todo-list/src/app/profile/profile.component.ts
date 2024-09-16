import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  profileForm: FormGroup;
  actionInProgress: boolean = false;
  phoneField: string = "";
  genderField: string = "";
  birthDateField: string = "";
  date: Date = new Date();
  invalidDate: boolean = false;

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      phone: ['', [Validators.pattern("[0-9]{11}")]],
      gender: [''],
      birthDate: ['']
    });
    this.fetchData();
  }

  fetchData(): any {
    this.authService.userData()
      .subscribe({
        next: (res) => {
          this.profileForm.value.phone = res.phone;
          this.profileForm.value.gender = res.gender;
          this.genderField = res.gender;
          this.profileForm.value.birthDate = res.birthDate;
          this.birthDateField = res.birthDate;
          console.log(res.message);
        },
        error: (err) => {
          console.log(err.error.message);
        }
      });
  }

  changeOption(event: any) {
    this.profileForm.value.gender = event.target.value;
  }

  changeDate(event: any) {
    this.invalidDate = false;
    if ((new Date(event.target.value).getTime() - this.date.getTime()) >= 0) {
      this.invalidDate = true;
      return;
    }
    this.profileForm.value.birthDate = event.target.value;
  }

  onSave() {
    this.actionInProgress = true;
    if (this.profileForm.valid) {
      this.authService.updateUserInfo(this.profileForm.value)
        .subscribe({
          next: (res) => {
            this.router.navigate(['home']);
            console.log(res.message);
          },
          error: (err) => {
            console.log(err.error.message);
          }
        });
    } else {
      console.log("Form not valid");
      this.validateAllFormFields(this.profileForm);
    }
    this.actionInProgress = false;
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
    if (this.profileForm.valid && !this.actionInProgress) {
      this.onSave();
    }
  }
}