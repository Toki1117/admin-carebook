import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdictionComponent } from './form-adiction.component';

describe('FormAdictionComponent', () => {
  let component: FormAdictionComponent;
  let fixture: ComponentFixture<FormAdictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAdictionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAdictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
