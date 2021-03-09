import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbdSortableHeaderDirective } from './sortable.directive';



@NgModule({
  declarations: [NgbdSortableHeaderDirective],
  imports: [
    CommonModule
  ],
  exports: [NgbdSortableHeaderDirective],
})
export class DirectivesModule { }
