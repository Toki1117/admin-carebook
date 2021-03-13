import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormPhysicalComponent } from './components/form-physical/form-physical.component';
import { LayoutComponent } from './views/layout/layout.component';
import { PhysicalActivityComponent } from './views/physical-activity/physical-activity.component';

const routes: Routes = [{
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'physical',
        pathMatch: 'full'
      },
      {
        path: 'physical',
        component: PhysicalActivityComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [FormPhysicalComponent, LayoutComponent, PhysicalActivityComponent]
})
export class PhysicalActivityRoutingModule { }
