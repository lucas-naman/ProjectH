import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { pwdCheckValidator } from '../../../directives/check-pwd.directive';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: any;
  hide = true;
  smt = false;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pwd1: new FormControl('', [Validators.required, Validators.minLength(6)]),
      pwd2: new FormControl('', [Validators.required])
    },
    { validators: pwdCheckValidator});
   }

  ngOnInit(): void {
  }

  public registerSubmit(data: any) {
    this.smt = true;
    console.log(data)
    // this.registerForm.controls['pwd1'].reset()
    // this.registerForm.controls['pwd2'].reset()
  }

  /**
   * getEmailErrorMessage
  **/
  public getEmailErrorMessage(email: any) {
    if (email.hasError('required')) {
      return 'You must enter a value';
    }

    return email.hasError('email') ? 'Not a valid email' : '';
  }

  public getPwd1ErrorMessage(pwd: any) {
    if (pwd.hasError('required')) {
      return 'You must enter a value';
    }
    return pwd.hasError('minlength') ? 'Password must be at least 6 characters long' : ""
  }
  public getPwd2ErrorMessage(pwd: any, form: any) {
    if (pwd.hasError('required')) {
      return 'You must enter a value';
    }
  }

  public getUsernameErrorMessage(pwd: any) {
    if (pwd.hasError('required')) {
      return 'You must enter a value';
    }
  }
}
