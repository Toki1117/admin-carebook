import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./views/layout/layout.component";
import { AddictionTypeComponent } from "./views/addiction-type/addiction-type.component";

const routes: Routes = [ {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'addiction',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: AddictionTypeComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddictionTypeRoutingModule { }
