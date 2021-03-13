import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RatingComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill array based on value, then add 0 for empty stars', () => {
    expect(component.ratingStars).toEqual([0, 0, 0, 0, 0]);

    component.ratingValue = 3;
    component.ngOnInit();
    expect(component.ratingStars).toEqual([1, 1, 1, 0, 0]);

    component.ratingValue = 5;
    component.ngOnInit();
    expect(component.ratingStars).toEqual([1, 1, 1, 1, 1]);
  });
});
