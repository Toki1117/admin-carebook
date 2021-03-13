import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./views/layout/layout.component";
import { ArchiveComponent } from "./views/archive/archive.component";

const routes: Routes = [{
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'archive',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: ArchiveComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchiveTypeRoutingModule { }
