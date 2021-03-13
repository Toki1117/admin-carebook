import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhysicalActivityService } from './services/physical-activity.service';
import { FormPhysicalComponent } from './components/form-physical/form-physical.component';
import { PhysicalActivityComponent } from './views/physical-activity/physical-activity.component';
import { LayoutComponent } from './views/layout/layout.component';



@NgModule({
  declarations: [FormPhysicalComponent, PhysicalActivityComponent, LayoutComponent],
  imports: [
    CommonModule
  ],
  providers:[PhysicalActivityService]
})
export class PhysicalActivityModule { }
