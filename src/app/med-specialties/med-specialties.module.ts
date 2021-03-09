import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedSpecialtiesRoutingModule } from './med-specialties-routing.module';
import { LayoutComponent } from './views/layout/layout.component';
import { OverviewComponent } from './components/overview/overview.component';
import { MedSpecialtiesService } from './services/med-specialties.service';


@NgModule({
  declarations: [LayoutComponent, OverviewComponent],
  imports: [
    CommonModule,
    MedSpecialtiesRoutingModule
  ],
  providers: [MedSpecialtiesService]
})
export class MedSpecialtiesModule { }
