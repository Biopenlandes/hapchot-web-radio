import { Routes }        from '@angular/router';

import { HangoutsManagerComponent } from './hangouts-manager.component';
import { HangoutEditComponent } from './hangout-edit/hangout-edit.component';

export const hangoutsRoutes: Routes = [
  {
    path: "sorties",
    component : HangoutsManagerComponent,
    children : [
        { path: 'new', component : HangoutEditComponent },
        { path: 'edit/:key', component : HangoutEditComponent }
    ]
  },
  /*{ path: 'new', component : HangoutEditComponent },
  { path: 'edit/:key', component : HangoutEditComponent }*/
];