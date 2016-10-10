import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../shared/database.service';
import { SoundPlayerService, RadioState } from './sound-player.service';

import { Podcast } from '../podcasts/entity/podcast';
import { Track } from './track.class'

@Component({
  selector: 'app-sound-player',
  templateUrl: './sound-player.component.html',
  styleUrls: ['./sound-player.component.scss']
})
export class SoundPlayerComponent implements OnInit {

  podcasts : Podcast[] = [];
  track : Track;
  isRadioPlaying;
  modeRadio;
  radioState : RadioState;

  constructor(private db : DatabaseService,
              private soundPlayer : SoundPlayerService) { }

  ngOnInit() {
    this.db.getLatestPodcasts().subscribe(podcasts => this.podcasts = podcasts);

    this.soundPlayer.getModeRadio().subscribe(mode => this.modeRadio = mode);
    this.soundPlayer.getRadioState().subscribe(state => this.radioState = state);
    //this.soundPlayer.getRadioTrack().subscribe(track =>this.track = track);
    // fake track
    this.track = new Track();
    this.track.title = "Eh connard";
    this.track.album = "Dans ta guele";
    this.track.artist = "Keny Arkana";
    this.track.cover = "https://www.radioking.com/api/track/cover/8c7bf1e0-3e12-4ebb-a9a0-04f12439f1c7";

    this.soundPlayer.initMixcloudPlayer(document.getElementById('mixcloud-frame'));    
  }

}
