import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  form!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.initForm();
  }

  isPasswordEasy(controlName: string) {
    const control = this.form.controls[controlName];

    return (
      control.hasError('hasNumber') ||
      control.hasError('hasSpecialCharacters') ||
      control.hasError('hasWord')
    );
  }

  isPasswordMedium(controlName: string) {
    const control = this.form.controls[controlName];

    return (
      (control.hasError('hasNumber') &&
        control.hasError('hasSpecialCharacters')) ||
      (control.hasError('hasNumber') && control.hasError('hasWord')) ||
      (control.hasError('hasSpecialCharacters') && control.hasError('hasWord'))
    );
  }

  isPasswordStrong(controlName: string) {
    const control = this.form.controls[controlName];

    return (
      control.hasError('hasNumber') &&
      control.hasError('hasSpecialCharacters') &&
      control.hasError('hasWord')
    );
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl) => {
      const valid = regex.test(control.value);
      return !valid ? null : error;
    };
  }

  private initForm() {
    this.form = this.fb.group({
      password: [
        '',
        Validators.compose([
          Validators.minLength(8),
          this.patternValidator(/\d/, {
            hasNumber: true,
          }),
          this.patternValidator(/[a-z, A-Z]/, {
            hasWord: true,
          }),
          this.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
            hasSpecialCharacters: true,
          }),
        ]),
      ],
    });
  }
}
