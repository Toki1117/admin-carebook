import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsContainer } from './toast-container';
import { ToastService } from './toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ToastsContainer],
  imports: [
    CommonModule,
    NgbToastModule
  ],
  exports:[ToastsContainer],
  providers: [ToastService]
})
export class ToastModule { }
