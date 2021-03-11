import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhysicalActivityService } from './services/physical-activity.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[PhysicalActivityService]
})
export class PhysicalActivityModule { }
