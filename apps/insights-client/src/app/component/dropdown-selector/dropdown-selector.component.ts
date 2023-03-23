import { Component, Input } from '@angular/core';

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
  @Input() public options: DropdownOption[] = [];

  public selectedId = 'default';

  public open = false;

  public openOptions(): void {
    this.open = true;
  }

  public closeOptions(): void {
    this.open = false;
  }

  public selectedItem(): DropdownOption | null {
    return this.options.find((option) => this.selectedId === option.id) || null;
  }

  public selectOption(event: DropdownOption): void {
    this.selectedId = event.id;
    this.closeOptions();
  }
}
