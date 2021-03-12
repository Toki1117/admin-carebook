import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({ selector: '[appUnitMask]' })
export class UnitInputMaskDirective
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() inputValue: string;
  @Input() unit: string;

  ngUnsubscribe = new Subject();
  constructor(private element: ElementRef) {}

  ngOnInit() {
    fromEvent(this.element.nativeElement, 'blur')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((elem) => {
        this.addUnitText();
      });

    fromEvent(this.element.nativeElement, 'focus')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.removeUnitText();
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.addUnitText();
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(false);
    this.ngUnsubscribe.complete();
  }

  addUnitText() {
    const htmlElement = this.element.nativeElement as HTMLInputElement;
    htmlElement.value = this.inputValue + ' ' + this.unit;
  }

  removeUnitText() {
    const htmlElement = this.element.nativeElement as HTMLInputElement;
    htmlElement.value = this.inputValue;
  }
}
