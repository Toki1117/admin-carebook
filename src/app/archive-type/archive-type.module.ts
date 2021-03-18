import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveTypeService } from './services/archive-type.service';
import { LayoutComponent } from './views/layout/layout.component';
import { OverviewComponent } from './components/overview/overview.component';
import { FullTableModule } from '../shared/full-table/full-table.module';
import { SidebarDLModule } from '../shared/sidebar-dl/sidebar.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilderHelperModule } from '../shared/form-builder-helper/form-builder-helper.module';
import { ConfirmDialogModule } from '../shared/confirm-dialog/confirm-dialog.module';
import { ArchiveTypeRoutingModule } from './archive-type-routing.module';



@NgModule({
  declarations: [LayoutComponent, OverviewComponent],
  imports: [
    CommonModule,
    ArchiveTypeRoutingModule,
    FullTableModule,
    SidebarDLModule,
    NgbModalModule,
    ConfirmDialogModule,
    FormBuilderHelperModule
  ],
  providers:[ArchiveTypeService]
})
export class ArchiveTypeModule { }
