import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbdSortableHeaderDirective } from './sortable.directive';
import { UnitInputMaskDirective } from './unit-input-mask.directive';
import { NumericInputDirective } from './numeric-input.directive';

const items = [
	NgbdSortableHeaderDirective,
	UnitInputMaskDirective,
	NumericInputDirective,
];

@NgModule({
	declarations: [...items],
	imports: [CommonModule],
	exports: [...items],
})
export class DirectivesModule {}
