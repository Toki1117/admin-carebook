import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhysicalActivityService } from './services/physical-activity.service';
import { FormPhysicalComponent } from './components/form-physical/form-physical.component';
import { PhysicalActivityComponent } from './views/physical-activity/physical-activity.component';
import { LayoutComponent } from './views/layout/layout.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogModule } from '../shared/confirm-dialog/confirm-dialog.module';
import { FormBuilderHelperModule } from '../shared/form-builder-helper/form-builder-helper.module';
import { FullTableModule } from '../shared/full-table/full-table.module';
import { SidebarDLModule } from '../shared/sidebar-dl/sidebar.module';
import { PhysicalActivityRoutingModule } from './physical-activity-rounting.module';

@NgModule({
  declarations: [
    FormPhysicalComponent,
    PhysicalActivityComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    PhysicalActivityRoutingModule,
    FullTableModule,
    SidebarDLModule,
    NgbModalModule,
    ConfirmDialogModule,
    FormBuilderHelperModule,
  ],
  providers: [PhysicalActivityService],
})
export class PhysicalActivityModule {}
