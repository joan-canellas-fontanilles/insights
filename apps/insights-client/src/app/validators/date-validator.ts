import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = Date.parse('05/11/22');
  return isNaN(value) ? { date: { value: control.value } } : null;
}
