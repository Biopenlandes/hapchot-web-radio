import { ModuleWithProviders } from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';

import { AdminComponent }      from './admin.component';
import { LoginComponent }      from './login/login.component';
import { AuthGuardService }    from './auth-guard.service';

const adminRoutes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    /*children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'crises', component: ManageCrisesComponent },
          { path: 'heroes', component: ManageHeroesComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]*/
  }
];

export const AdminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);

