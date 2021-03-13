import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlertWrapperComponent } from './alert-wrapper.component';
import { AlertData } from '../alert.model';
import { AlertRef } from '../alert-ref';
import { ALERT_CONFIG_TOKEN } from '../alert-config.token';
import { defaultAlertConfig } from '../alert.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

describe('AlertWrapperComponent', () => {
  let component: AlertWrapperComponent;
  let fixture: ComponentFixture<AlertWrapperComponent>;
  let alertRefSpy = jasmine.createSpyObj('AlertRef', [
    'close',
    'isVisible',
    'getPosition',
  ]);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AlertWrapperComponent],
        imports: [NoopAnimationsModule, NgbAlertModule],
        providers: [
          AlertData,
          {
            provide: AlertRef,
            useValue: alertRefSpy,
          },
          {
            provide: ALERT_CONFIG_TOKEN,
            useValue: defaultAlertConfig,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
