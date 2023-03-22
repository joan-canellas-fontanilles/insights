import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'insights-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Output() public buttonClicked = new EventEmitter();

  public onButtonClick(): void {
    this.buttonClicked.emit();
  }
}
