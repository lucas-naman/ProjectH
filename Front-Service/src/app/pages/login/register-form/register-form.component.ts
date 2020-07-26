import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { pwdCheckValidator } from '../../../directives/check-pwd.directive';
import { AuthenticationService } from '../../../_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: any;
  hide = true;
  smt = false;
  loading = false;
  error = ""

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) {
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

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(data["email"], data["pwd"], data["username"])
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
