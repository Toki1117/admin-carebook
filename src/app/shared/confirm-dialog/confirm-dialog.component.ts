import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @Input() text: string;
  @Input() icon: string;

  constructor(private ngbActiveModal: NgbActiveModal) {}

  cancel(): void {
    this.ngbActiveModal.close('cancel');
  }

  confirm(): void {
    this.ngbActiveModal.close('confirm');
  }
}
