import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let activeModal: NgbActiveModal;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfirmDialogComponent],
        imports: [NgbModalModule],
        providers: [NgbActiveModal],
      }).compileComponents();

      activeModal = TestBed.inject(NgbActiveModal);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal and return value cancel when the action is canceled', () => {
    const spyActiveModal = spyOn(activeModal, 'close');

    component.cancel();
    expect(spyActiveModal).toHaveBeenCalled();
    expect(spyActiveModal).toHaveBeenCalledWith('cancel');
  });

  it('should close modal and return value confirm when the action is accepted', () => {
    const spyActiveModal = spyOn(activeModal, 'close');

    component.confirm();
    expect(spyActiveModal).toHaveBeenCalled();
    expect(spyActiveModal).toHaveBeenCalledWith('confirm');
  });
});
