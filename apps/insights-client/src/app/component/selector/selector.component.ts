import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MetricSelectorItem } from '../metric-selector/metric-selector-item';
import { SelectorElement } from './selector-element';
import { SelectorType } from './selector-type';

type SelectorTypes = 'checkbox' | 'radiobutton';

@Component({
  selector: 'insights-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent {
  @Input() public elements: SelectorElement[] = [];
  @Input() public selectorType: SelectorTypes = SelectorType.Checkbox;
  @Output() public elementClick = new EventEmitter<SelectorElement>();

  public selectorTypes = SelectorType;

  public clickElement(element: SelectorElement): void {
    this.elementClick.emit(element);
  }

  public trackByItems(index: number, item: MetricSelectorItem): string {
    return item.id;
  }
}
