import { NgModule } from '@angular/core';

import { SidebarDLComponent } from './sidebar.component';
import { CommonModule } from '@angular/common';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  imports: [CommonModule, ClickOutsideModule],
  exports: [SidebarDLComponent],
  declarations: [SidebarDLComponent],
  providers: [],
})
export class SidebarDLModule {}
