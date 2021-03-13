import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { CardsComponent } from './card/card.component';
import { ToastComponent } from './toast/toast.component';
import { ToastModule } from '../shared/toast/toast/toast.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastModule
  ],
  declarations: [
    CardsComponent,
    ToastComponent,
  ]
})
export class ComponentsModule {}
