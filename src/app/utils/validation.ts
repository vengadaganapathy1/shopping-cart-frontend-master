import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control.value !== checkControl.value) {
        controls.get(checkControlName).setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  static alphaNumeric(controlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const REGEXP = /^[a-zA-Z0-9]{10}$/;
      console.log(REGEXP.test(control.value));
      if (REGEXP.test(control.value)) {
        return null;
      }
      return {
        invalidSKU: true,
      };
    };
  }
}
