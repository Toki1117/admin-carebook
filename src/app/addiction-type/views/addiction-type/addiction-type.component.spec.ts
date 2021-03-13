import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddictionTypeComponent } from './addiction-type.component';

describe('AddictionTypeComponent', () => {
  let component: AddictionTypeComponent;
  let fixture: ComponentFixture<AddictionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddictionTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddictionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
