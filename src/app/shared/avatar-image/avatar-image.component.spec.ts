import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvatarImageComponent } from './avatar-image.component';

describe('AvatarImageComponent', () => {
  let component: AvatarImageComponent;
  let fixture: ComponentFixture<AvatarImageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AvatarImageComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarImageComponent);
    component = fixture.componentInstance;
    component.item = {
      profilePicFilepath: '',
      lastName: 'Doe',
      firstName: 'John',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
