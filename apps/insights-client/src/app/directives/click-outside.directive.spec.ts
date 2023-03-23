import { ClickOutsideDirective } from './click-outside.directive';
import { ElementRef } from '@angular/core';

describe('ClickOutsideDirective', () => {
  it('should create an instance', () => {
    const div = document.createElement('div');
    const mock: ElementRef = new ElementRef(div);
    const directive = new ClickOutsideDirective(mock);
    expect(directive).toBeTruthy();
  });
});
