import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the hero's alter ego */
export const pwdCheckValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const pwd1 = control.get('pwd1');
  const pwd2 = control.get('pwd2');

  return pwd1 && pwd2 && pwd1.value !== pwd2.value ? { 'pwdDiff': true } : null;
};

@Directive({
  selector: '[appPwdCheck]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PwdCheckValidatorDirective, multi: true }]
})
export class PwdCheckValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return pwdCheckValidator(control)
  }
}