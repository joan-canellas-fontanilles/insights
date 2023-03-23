import { AbstractControl, ValidationErrors } from '@angular/forms';

export function numberValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = Number(control.value);
  return isNaN(value) ? { number: { value: control.value } } : null;
}
