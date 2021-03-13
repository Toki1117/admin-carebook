import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArchiveComponent } from './form-archive.component';

describe('FormArchiveComponent', () => {
  let component: FormArchiveComponent;
  let fixture: ComponentFixture<FormArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
