import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

interface DropdownOption {
  id: string;
  name: string;
}

@Component({
  selector: 'insights-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.scss'],
})
export class DropdownSelectorComponent {
  public field = new FormControl('');
  @Input() public options: DropdownOption[] = [];
  @Input() public label?: string;
  @Output() public optionSelected = new EventEmitter<string>();

  public selectedId = 'default';

  public open = false;

  public openOptions(): void {
    this.open = true;
  }

  public closeOptions(): void {
    this.open = false;
  }

  public selectOption(event: DropdownOption): void {
    this.selectedId = event.id;
    this.field.setValue(event.name);
    this.closeOptions();
    this.optionSelected.emit(event.id);
  }
}
