import {
  Directive,
  ElementRef,
  OnChanges,
  HostListener,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

@Directive({
  selector: '[appPasswordStrength]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordStrengthDirective,
      multi: true,
    },
  ],
})
export class PasswordStrengthDirective implements Validator, OnChanges {
  constructor(private el: ElementRef) {
    console.log(el.nativeElement.value);
  }

  // Listen for keyup event and change background color
  @HostListener('window:keyup') ngOnChanges(changes: SimpleChanges): void {
    let count = this.el.nativeElement.value.length;
    console.log(this.el.nativeElement.value.length);

    if (count < 5) {
      this.el.nativeElement.style.backgroundColor = 'red';
    } else if (count >= 5 && count <= 10) {
      this.el.nativeElement.style.backgroundColor = 'green';
    } else if (count > 10) {
      this.el.nativeElement.style.backgroundColor = 'purple';
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return createPasswordStrengthValidator()(control);
  }
}
