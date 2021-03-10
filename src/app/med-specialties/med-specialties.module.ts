import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedSpecialtiesRoutingModule } from './med-specialties-routing.module';
import { LayoutComponent } from './views/layout/layout.component';
import { OverviewComponent } from './components/overview/overview.component';
import { MedSpecialtiesService } from './services/med-specialties.service';
import { FullTableModule } from '../shared/full-table/full-table.module';
import { SidebarDLModule } from '../shared/sidebar-dl/sidebar.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogModule } from '../shared/confirm-dialog/confirm-dialog.module';


@NgModule({
  declarations: [LayoutComponent, OverviewComponent],
  imports: [
    CommonModule,
    MedSpecialtiesRoutingModule,
    FullTableModule,
    SidebarDLModule,
    NgbModalModule,
    ConfirmDialogModule
  ],
  providers: [MedSpecialtiesService]
})
export class MedSpecialtiesModule { }
