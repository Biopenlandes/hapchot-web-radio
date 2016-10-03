import { ModuleWithProviders } from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';

import { AdminComponent }      from './admin.component';
import { LoginComponent }      from './login/login.component';
import { AuthGuardService }    from './auth-guard.service';

import { HangoutsManagerComponent }  from './hangouts-manager/hangouts-manager.component';
import { NewsManagerComponent }  from './news-manager/news-manager.component';
import {AdminHomeComponent } from './admin-home.component';

const adminRoutes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    /*canActivateChild: [AuthGuardService],*/
    children: [
      { path: 'sorties', component: HangoutsManagerComponent },
      { path: 'actus', component: NewsManagerComponent },
      { path: '', component: AdminHomeComponent },
    ]
  }
];

export const AdminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);

