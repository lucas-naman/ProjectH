import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: any;
  hide = true;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  /**
   * loginSubmit
  **/
  public loginSubmit(data: any) {
    console.log(data)
    this.loginForm.controls['pwd'].reset()
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

  public getPwdErrorMessage(pwd: any) {
    if (pwd.hasError('required')) {
      return 'You must enter a value';
    }
  }

}
