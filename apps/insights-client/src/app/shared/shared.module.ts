import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from './layout/app-bar/app-bar.component';
import { ButtonComponent } from './components/button/button.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { DropdownSelectorComponent } from './components/dropdown-selector/dropdown-selector.component';
import { SelectorComponent } from './components/selector/selector.component';
import { RouterLink } from '@angular/router';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectorCheckboxComponent } from './components/selector/selector-checkbox/selector-checkbox.component';
import { SelectorRadioComponent } from './components/selector/selector-radio/selector-radio.component';

@NgModule({
  declarations: [
    AppBarComponent,
    ButtonComponent,
    TextInputComponent,
    DropdownSelectorComponent,
    SelectorComponent,
    SelectorCheckboxComponent,
    SelectorRadioComponent,
    ClickOutsideDirective,
  ],
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  exports: [
    AppBarComponent,
    ButtonComponent,
    TextInputComponent,
    DropdownSelectorComponent,
    SelectorComponent,
  ],
})
export class SharedModule {}
