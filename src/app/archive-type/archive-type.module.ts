import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveTypeService } from './services/archive-type.service';
import { LayoutComponent } from './views/layout/layout.component';
import { ArchiveComponent } from './views/archive/archive.component';
import { FormArchiveComponent } from './components/form-archive/form-archive.component';



@NgModule({
  declarations: [LayoutComponent, ArchiveComponent, FormArchiveComponent],
  imports: [
    CommonModule
  ],
  providers:[ArchiveTypeService]
})
export class ArchiveTypeModule { }
