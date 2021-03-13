import { TemplateRef } from '@angular/core';

export class AlertData {
  type: AlertType;
  text?: string;
  template?: TemplateRef<any>;
  templateContext?: {};
}

export type AlertType = 'warning' | 'info' | 'success' | 'danger';

export interface AlertConfig {
  position?: {
    top: number;
    right?: number;
  };
  animation?: {
    fadeOut: number;
    fadeIn: number;
  };
}
