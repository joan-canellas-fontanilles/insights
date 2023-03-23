import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'insights-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
  @Input() public readonly = false;
  @Input() public field!: FormControl;
  @Input() public label?: string;

  private errorMessage: Record<string, (...arg: any[]) => string> = {
    required: () => 'The input is required',
    minlength: () => 'The provided input is to small',
    maxlength: () => 'The provided input is to large',
    request: (message: string) => message,
  };

  public getMessage(error: string, message: unknown): string {
    let errorMessage = this.errorMessage[error];
    errorMessage ??= (message) => message;
    return errorMessage(message);
  }

  public getError(): string | undefined {
    if (this.field.untouched || this.field.valid) return;
    const [error, message] = Object.entries(this.field.errors || {})[0];
    return this.getMessage(error, message);
  }
}
