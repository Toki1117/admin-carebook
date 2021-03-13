import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPhysicalComponent } from './form-physical.component';

describe('FormPhysicalComponent', () => {
  let component: FormPhysicalComponent;
  let fixture: ComponentFixture<FormPhysicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPhysicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPhysicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
