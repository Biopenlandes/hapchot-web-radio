import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { SoundManagerService } from './sound-manager.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ 
    SoundManagerService
  ],
  declarations: [PlayerComponent]
})
export class PlayerModule { }
