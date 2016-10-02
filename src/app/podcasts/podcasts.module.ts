import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PodcastComponent } from './podcast/podcast.component';
import { LatestPodcastsComponent } from './latest-podcasts/latest-podcasts.component';
import { ProgramComponent } from './program/program.component';
import { ProgramListComponent } from './program-list/program-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PodcastComponent, 
    LatestPodcastsComponent, 
    ProgramComponent, 
    ProgramListComponent
  ]
})
export class PodcastsModule { }
