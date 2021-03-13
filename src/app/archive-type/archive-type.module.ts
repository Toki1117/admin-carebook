import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveTypeService } from './services/archive-type.service';
import { LayoutComponent } from './views/layout/layout.component';
import { ArchiveComponent } from './views/archive/archive.component';
import { OverviewComponent } from './components/overview/overview.component';



@NgModule({
  declarations: [LayoutComponent, ArchiveComponent, OverviewComponent],
  imports: [
    CommonModule
  ],
  providers:[ArchiveTypeService]
})
export class ArchiveTypeModule { }
