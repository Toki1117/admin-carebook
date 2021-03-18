import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appNumericInput]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: NumericInputDirective, multi: true },
  ],
})
export class NumericInputDirective {
  constructor(private el: ElementRef) {}

  @Input() latestInputValue: number;
  @Input() minLimit: number;
  @Input() maxLimit: number;
  @Input() float = false;
  @Input() negative = false;

  validate(control: FormControl) {
    if (control.value < this.minLimit) {
      control.patchValue(this.minLimit);
    } else if (control.value > this.maxLimit) {
      control.patchValue(this.maxLimit);
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e: KeyboardEvent = event;

    if (
      e.code.includes('Digit') ||
      e.code.includes('Numpad') ||
      e.code === 'Backspace' ||
      e.code === 'ArrowLeft' ||
      e.code === 'ArrowRight' ||
      e.code === 'ArrowDown' ||
      e.code === 'ArrowUp' ||
      e.code === 'Tab' ||
      (e.code === 'Minus' && this.negative) ||
      (e.code === 'Period' && this.float)
    ) {
      if (this.latestInputValue > this.maxLimit) {
        if (
          e.code === 'Backspace' ||
          e.code === 'ArrowLeft' ||
          e.code === 'ArrowRight' ||
          e.code === 'ArrowDown' ||
          e.code === 'Tab'
        ) {
          return;
        }
        e.preventDefault();
      }
    } else {
      e.preventDefault();
    }
  }
}
