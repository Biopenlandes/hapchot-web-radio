import { ModuleWithProviders } from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';

import { CoreComponent }    from './core.component';
import { HomeComponent }    from '../home/home.component';
import { PresentationComponent }  from '../presentation/presentation.component';
import { CalendarComponent }  from '../calendar/calendar.component';
import { HangoutComponent } from '../hangouts/hangout/hangout.component';
import { NewsComponent } from '../news/news/news.component';
import { ProgramComponent } from '../podcasts/program/program.component';
import { ProgramListComponent } from '../podcasts/program-list/program-list.component';


const coreRoutes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
        { path: '',    component: HomeComponent },
        { path: 'le-projet', component: PresentationComponent },
        { path: 'grille-des-programmes', component: CalendarComponent },
        { path: 'evenement/:slug', component: HangoutComponent },
        { path: 'actu/:slug', component: NewsComponent },
        { path: 'emissions', component: ProgramListComponent },
        { path: 'emission/:slug', component: ProgramComponent }
    ]
  }
];

export const CoreRouting: ModuleWithProviders = RouterModule.forChild(coreRoutes);
