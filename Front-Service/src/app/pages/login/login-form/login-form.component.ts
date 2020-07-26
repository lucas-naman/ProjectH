import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../../_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: any;
  hide = true;

  loading = false;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.loginForm = this.formBuilder.group({
      email: ['zozo@zozo.com', [Validators.required, Validators.email]],
      pwd: ['zozozo', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  /**
   * loginSubmit
  **/
  public loginSubmit(data: any) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(data["email"], data["pwd"])
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(["/home"]);
          },
          error => {
            this.error = error;
            this.loading = false;
          });
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
