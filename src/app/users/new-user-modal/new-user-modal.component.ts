import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormControl } from '@angular/forms';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

type UserFields = 'name' | 'email' | 'password' | 'repeatPassword';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.scss']
})
export class NewUserModalComponent implements OnInit {

  userForm: FormGroup;
  formErrors: FormErrors = {
    'name': '',
    'email': '',
    'password': '',
    'repeatPassword': ''
  };

  validationMessage = {
    'email': {
      'required': 'Email is required',
      'email': 'Email must be valid'
    },
    'name': {
      'required': 'Name is required',
      'minlength': 'Name must be at least 3 char long.'
    },
    'password': {
      'required': 'Password is required',
      'pattern': 'Password must contain at least one letter and number.',
      'minlength': 'Password must be at least 6 char long.',
      'maslength': 'Password cannot be more than 40 chars long.'
    },
    'repeatPassword': {
      'required': 'Repeat password is required',
      'mustBeSame': 'Repeat password must be same as password'
    }
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<NewUserModalComponent>,
    private router: Router,
    private _aS: AuthService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.formBuilder.group(
      {
        'name': ['', [
          Validators.required,
          Validators.minLength(3)
        ]],
        'email': ['', [
          Validators.required,
          Validators.email
        ]],
        'password': ['', [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(40),
          Validators.required
        ]],
        'repeatPassword': ['', [
          Validators.required,
        ]]
      }
    );
    this.userForm.valueChanges.subscribe(
      data => this.onValueChanged(data)
    );
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (this.userForm.value.password !== this.userForm.value.repeatPassword) {
          this.formErrors['repeatPassword'] = this.validationMessage['repeatPassword']['mustBeSame'];
          return;
        }
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessage[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                this.formErrors[field] += `${(messages as {[key: string]: string})[key]} \n`;
              }
            }
          }
        }
      }
    }
  }

  signUp() {
    if (this.userForm.valid) {
      this._aS.emailSignup(this.userForm.value).subscribe(response =>{
        if (response.statusText = 'OK') {
          this.dialogRef.close();
        }
      });
    }
  }

}
