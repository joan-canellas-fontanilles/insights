import { ClickOutsideDirective } from './click-outside.directive';
import { ElementRef } from '@angular/core';

describe('ClickOutsideDirective', () => {
  it('should create an instance', () => {
    const mock: ElementRef = new ElementRef(new HTMLDivElement());
    const directive = new ClickOutsideDirective(mock);
    expect(directive).toBeTruthy();
  });
});
