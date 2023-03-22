import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectorElement } from '../selector-element';

@Component({
  selector: 'insights-selector-radio',
  templateUrl: './selector-radio.component.html',
  styleUrls: [
    '../shared/selector-element.component.scss',
    './selector-radio.component.scss',
  ],
})
export class SelectorRadioComponent {
  @Input() public element: SelectorElement | null = null;
  @Output() public checkboxClick = new EventEmitter<SelectorElement>();

  public click(element: SelectorElement): void {
    this.checkboxClick.emit(element);
  }
}
