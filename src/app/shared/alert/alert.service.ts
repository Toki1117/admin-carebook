import { Injectable, Injector, Inject } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AlertRef } from './alert-ref';
import { ALERT_CONFIG_TOKEN } from './alert-config.token';
import { AlertConfig, AlertData } from './alert.model';
import { AlertWrapperComponent } from './alert-wrapper/alert-wrapper.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private lastAlert: AlertRef;

  constructor(
    private overlay: Overlay,
    private parentInjector: Injector,
    @Inject(ALERT_CONFIG_TOKEN) private alertConfig: AlertConfig
  ) {}

  show(data: AlertData) {
    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({ positionStrategy });

    const alertRef = new AlertRef(overlayRef);
    this.lastAlert = alertRef;

    const injector = this.getInjector(data, alertRef, this.parentInjector);
    const alertPortal = new ComponentPortal(
      AlertWrapperComponent,
      null,
      injector
    );

    overlayRef.attach(alertPortal);

    return alertRef;
  }

  getPositionStrategy() {
    return this.overlay
      .position()
      .global()
      .top(this.getPosition())
      .centerHorizontally();
  }

  getPosition() {
    const lastAlertIsVisible = this.lastAlert && this.lastAlert.isVisible();
    const position = lastAlertIsVisible
      ? this.lastAlert.getPosition().bottom
      : this.alertConfig.position.top;

    return position + 'px';
  }

  getInjector(data: AlertData, alertRef: AlertRef, parentInjector: Injector) {
    return Injector.create({
      providers: [
        {
          provide: AlertData,
          useValue: data,
        },
        {
          provide: AlertRef,
          useValue: alertRef,
        },
      ],
      parent: parentInjector,
    });
  }
}
