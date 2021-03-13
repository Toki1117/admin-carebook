import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ALERT_CONFIG_TOKEN } from '../alert-config.token';
import { AlertRef } from '../alert-ref';
import { alertAnimation, AlertAnimationState } from '../alert.animation';
import { AlertConfig, AlertData } from '../alert.model';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-alert-wrapper',
  templateUrl: './alert-wrapper.component.html',
  styleUrls: ['./alert-wrapper.component.scss'],
  animations: [alertAnimation.fadeAlert],
})
export class AlertWrapperComponent implements OnInit, OnDestroy {
  animationState: AlertAnimationState = 'default';
  iconType: string;

  private intervalTimeout: any;

  constructor(
    readonly data: AlertData,
    readonly ref: AlertRef,
    @Inject(ALERT_CONFIG_TOKEN) public toastConfig: AlertConfig
  ) {
    this.iconType = data.type && this.getIcon(data.type);
  }

  ngOnInit() {
    this.intervalTimeout = setTimeout(
      () => (this.animationState = 'closing'),
      5000
    );
  }

  ngOnDestroy() {
    clearTimeout(this.intervalTimeout);
  }

  close() {
    this.ref.close();
  }

  onFadeFinished(event: AnimationEvent) {
    const { toState } = event;
    const isFadeOut = (toState as AlertAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }

  getIcon(alertType: string) {
    const iconDictionary = {
      success: 'dripicons-checkmark',
      danger: 'dripicons-wrong',
      warning: 'dripicons-warning',
      info: 'dripicons-information',
    };
    return iconDictionary[alertType];
  }
}
