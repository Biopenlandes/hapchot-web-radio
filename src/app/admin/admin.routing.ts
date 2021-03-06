import { ModuleWithProviders } from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';

import { AdminComponent }      from './admin.component';
import { LoginComponent }      from './login/login.component';
import { AuthGuardService }    from './auth-guard.service';

import { PresentationEditComponent }  from './presentation-edit/presentation-edit.component';
import { NewsletterComponent }  from './newsletter/newsletter.component';
/*import { ItemsListComponent }  from './items-list/items-list.component';*/
import { AdminHomeComponent } from './admin-home.component';
import { ItemManagerComponent } from './item-manager/item-manager.component';
/*import { ItemEditResolve } from './item-edit/item-edit-resolve.service';*/
import { CalendarComponent } from '../calendar/calendar.component';

const adminRoutes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    canLoad :[AuthGuardService],
    children: [
      /*{ path: ':itemType/edit/:slug', component: ItemEditComponent },
      { path: ':itemType/new', component: ItemEditComponent }, */
      
      /*{ // sorties, /actus etc..
        path: ':itemType', 
        component: ItemsManagerComponent,
        children: [                   
          { path: 'list', component: ItemsListComponent },
          { path: 'edit/:slug', component: ItemEditComponent,  resolve: { item: ItemEditResolve } },
          { path: 'new', component: ItemEditComponent }                 
        ]
      },*/
      { path: 'calendar', redirectTo: '/grille-des-programmes', pathMatch: 'full'},
      { path: 'newsletter', component: NewsletterComponent },
      { path: 'info/:slug', component: PresentationEditComponent },
      { path: ':itemType', component: ItemManagerComponent}, 
      { path: '', component: AdminHomeComponent },
    ]
  }
];

export const AdminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);

