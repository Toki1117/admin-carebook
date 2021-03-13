import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ALERT_CONFIG_TOKEN } from './alert-config.token';
import { AlertConfig } from './alert.model';
import { OverlayModule } from '@angular/cdk/overlay';
import { AlertWrapperComponent } from './alert-wrapper/alert-wrapper.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

export const defaultAlertConfig: AlertConfig = {
  position: {
    top: 90,
  },
  animation: {
    fadeOut: 2500,
    fadeIn: 300,
  },
};

@NgModule({
  declarations: [AlertWrapperComponent],
  imports: [CommonModule, OverlayModule, NgbAlertModule],
})
export class AlertModule {
  public static forRoot(
    config = defaultAlertConfig
  ): ModuleWithProviders<AlertModule> {
    return {
      ngModule: AlertModule,
      providers: [
        {
          provide: ALERT_CONFIG_TOKEN,
          useValue: { ...defaultAlertConfig, ...config },
        },
      ],
    };
  }
}
