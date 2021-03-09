import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedSpecialtiesRoutingModule } from './med-specialties-routing.module';
import { LayoutComponent } from './views/layout/layout.component';
import { OverviewComponent } from './components/overview/overview.component';


@NgModule({
  declarations: [LayoutComponent, OverviewComponent],
  imports: [
    CommonModule,
    MedSpecialtiesRoutingModule
  ]
})
export class MedSpecialtiesModule { }
