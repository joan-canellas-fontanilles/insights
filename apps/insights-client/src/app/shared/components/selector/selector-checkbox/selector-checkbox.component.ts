import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectorElement } from '../selector-element';

@Component({
  selector: 'insights-selector-checkbox',
  templateUrl: './selector-checkbox.component.html',
  styleUrls: [
    '../shared/selector-element.component.scss',
    './selector-checkbox.component.scss',
  ],
})
export class SelectorCheckboxComponent {
  @Input() public element: SelectorElement | null = null;
  @Output() public checkboxClick = new EventEmitter<SelectorElement>();

  public click(element: SelectorElement): void {
    this.checkboxClick.emit(element);
  }
}
