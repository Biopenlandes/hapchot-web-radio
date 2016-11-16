import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { CoreComponent }    from './core.component';
import { CoreRouting }       from './core.routing';
import { SoundPlayerModule } from '../sound-player/sound-player.module'

import { HomeModule }    from '../home/home.module';
import { NewsModule }    from '../news/news.module';
import { PodcastsModule }    from '../podcasts/podcasts.module';
import { HangoutsModule }    from '../hangouts/hangouts.module';

import { PresentationComponent }  from '../presentation/presentation.component';
import { HeaderComponent } from './header/header.component';

import { SoundPlayerComponent } from '../sound-player/sound-player.component';

import { MatchMediaService } from '../shared/match-media.service';
import { SocialLinksComponent } from './social-links/social-links.component';

@NgModule({
  imports: [ 
    CommonModule, 
    CoreRouting,
    HomeModule,
    SoundPlayerModule,
    NewsModule,
    PodcastsModule,
    HangoutsModule
  ],
  declarations: [ 
    CoreComponent,  
    PresentationComponent, 
    HeaderComponent,
    SoundPlayerComponent
  ],
  providers: [ MatchMediaService ]
})
export class CoreModule {}

