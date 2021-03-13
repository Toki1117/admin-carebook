import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, NgbModalModule],
})
export class ConfirmDialogModule {}
