import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddictionTypeService } from './services/addiction-type.service';
import { FormAdictionComponent } from './components/form-adiction/form-adiction.component';
import { AddictionTypeComponent } from './views/addiction-type/addiction-type.component';
import { LayoutComponent } from './views/layout/layout.component';
import { AddictionTypeRoutingModule } from './addiction-type-routing.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogModule } from '../shared/confirm-dialog/confirm-dialog.module';
import { FormBuilderHelperModule } from '../shared/form-builder-helper/form-builder-helper.module';
import { FullTableModule } from '../shared/full-table/full-table.module';
import { SidebarDLModule } from '../shared/sidebar-dl/sidebar.module';

@NgModule({
  declarations: [FormAdictionComponent, AddictionTypeComponent, LayoutComponent],
  imports: [
    CommonModule,
    AddictionTypeRoutingModule,
    FullTableModule,
    SidebarDLModule,
    NgbModalModule,
    ConfirmDialogModule,
    FormBuilderHelperModule
  ],
providers:[AddictionTypeService]
})
export class AddictionTypeModule { }
