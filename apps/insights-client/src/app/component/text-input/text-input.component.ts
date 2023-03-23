import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'insights-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
  @Input() public focused = false;
  @Input() public readonly = false;
  @Input() public value?: string;
  @Output() public changed = new EventEmitter<string>();

  public onChanged(event: string): void {
    this.changed.emit(event);
  }
}
