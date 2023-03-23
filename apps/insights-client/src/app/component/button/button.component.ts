import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'insights-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Output() public buttonClicked = new EventEmitter();
  @Input() public active: boolean | null = false;

  public onButtonClick(): void {
    this.buttonClicked.emit();
  }
}
