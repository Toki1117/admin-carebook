import {
  AnimationTriggerMetadata,
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';

export interface IAlertAnimation {
  readonly fadeAlert: AnimationTriggerMetadata;
}

export const alertAnimation: IAlertAnimation = {
  fadeAlert: trigger('fadeAnimation', [
    state('default', style({ opacity: 1 })),
    transition('void => *', [style({ opacity: 0 }), animate('{{ fadeIn }}ms')]),
    transition(
      'default => closing',
      animate('{{ fadeOut }}ms', style({ opacity: 0 }))
    ),
  ]),
};

export type AlertAnimationState = 'default' | 'closing';
