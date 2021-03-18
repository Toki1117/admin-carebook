import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardGuard } from './core/guards/dashboard.guard';

import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'medical-specialties',
        loadChildren: () => import('./med-specialties/med-specialties.module').then(m => m.MedSpecialtiesModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'addiction-types',
        loadChildren: () => import('./addiction-type/addiction-type.module').then(m => m.AddictionTypeModule)
      },
      {
        path: 'archive-types',
        loadChildren: () => import('./archive-type/archive-type.module').then(m => m.ArchiveTypeModule)
      },
      {
        path: 'physical-activities-types',
        loadChildren: () => import('./physical-activity/physical-activity.module').then(m => m.PhysicalActivityModule)
      }
    ]
  },
  {
    path: 'authentication',
    canActivate: [DashboardGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];
