import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddictionTypeService } from './services/addiction-type.service';
import { FormAdictionComponent } from './components/form-adiction/form-adiction.component';
import { AddictionTypeComponent } from './views/addiction-type/addiction-type.component';
import { LayoutComponent } from './views/layout/layout.component';



@NgModule({
  declarations: [FormAdictionComponent, AddictionTypeComponent, LayoutComponent],
  imports: [
    CommonModule
  ],
providers:[AddictionTypeService]
})
export class AddictionTypeModule { }
