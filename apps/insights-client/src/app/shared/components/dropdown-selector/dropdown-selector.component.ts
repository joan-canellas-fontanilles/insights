import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
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
export class DropdownSelectorComponent implements OnChanges {
  public field = new FormControl('');
  @Input() public options: DropdownOption[] = [];
  @Input() public label?: string;
  @Output() public optionSelected = new EventEmitter<string>();

  public selectedId = 'default';

  public open = false;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.disableInput();
    }
  }

  public openOptions(): void {
    if (this.field.disabled) return;
    this.open = true;
  }

  public closeOptions(): void {
    this.open = false;
  }

  public disableInput(): void {
    const disabled = this.options.length === 0;
    if (disabled) {
      this.field.disable();
    } else {
      this.field.enable();
    }
  }

  public selectOption(event: DropdownOption): void {
    this.selectedId = event.id;
    this.field.setValue(event.name);
    this.closeOptions();
    this.optionSelected.emit(event.id);
  }
}
