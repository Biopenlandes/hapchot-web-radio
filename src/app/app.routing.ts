import { ModuleWithProviders, NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class HapchotWebRadioRoutingModule { }