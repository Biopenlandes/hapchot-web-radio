import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Track } from './track.class'
import { Podcast } from '../podcasts/entity/podcast';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare var soundManager: any;
declare var Mixcloud: any;

const radioStream = "http://www.radioking.com/play/hapchot-webradio";
const radioInfosUrl = 'https://www.radioking.com/widgets/currenttrack.php?radio=3046&format=json';

export enum RadioState
{
  Stopped, Loading, Playing
}
@Injectable()
export class SoundPlayerService {

  radio : any;
  mixcloudPlayer : any;
  modeRadio : boolean = true;
  modeRadioStream : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  radioState : RadioState = RadioState.Stopped;
  radioStateStream : BehaviorSubject<RadioState> = new BehaviorSubject<RadioState>(RadioState.Stopped);

  constructor(private http : Http) { 
    soundManager.setup({
      url: '/path/to/swf-files/',
      onready: () =>
      { 
        console.log("sound manager ready");
      },
      ontimeout: function() {
        console.log("SoundManager problème démarrage");
      }
    });    
  }

  // -----------------
  //      PODCAST
  // -----------------

  initMixcloudPlayer(mixcloudFrame)
  {
    this.mixcloudPlayer = Mixcloud.PlayerWidget(mixcloudFrame);
    /*this.mixcloudPlayer.ready.then(function() {
        console.log("HEY MIXLOUD");
    });*/
  }

  playPodcast(podcast : Podcast)
  {
    this.stopRadio();
    this.setModeRadio(false);
    this.mixcloudPlayer.load(podcast.key, true)/*.then( () => this.mixcloudPlayer.play())*/;
  }

  pausePodcast()
  {
    this.mixcloudPlayer.pause();
  }

  // -----------------
  //      COMMUN
  // -----------------

  private setModeRadio(bool : boolean)
  {
    this.modeRadio = bool;
    this.modeRadioStream.next(bool);
  }

  getModeRadio(): Observable<boolean>
  {
    return this.modeRadioStream.asObservable();
  }

  // -----------------
  //      RADIO
  // -----------------

  private setRadioState(state : RadioState)
  {
    this.radioState = state;
    this.radioStateStream.next(state);
  }

  getRadioState(): Observable<RadioState>
  {
    return this.radioStateStream.asObservable();
  }

  playRadio()
  {
    if( this.radioState != RadioState.Stopped) return;

    this.pausePodcast();
    this.setModeRadio(true);
    this.setRadioState(RadioState.Loading);
    if (!this.radio) 
      this.radio = soundManager.createSound({
          id: 'radio',
          url: radioStream
      });
    soundManager.play('radio',{
      onload: (success : boolean) => 
      {
        this.setRadioState(success ? RadioState.Playing : RadioState.Stopped);
      }
    });
  }

  stopRadio()
  {
    soundManager.unload('radio');
    this.setRadioState(RadioState.Stopped);
  }

  getRadioTrack() : Observable<Track>
  {
    return this.http.get(radioInfosUrl).map( (result:any) =>
    {
      
      let resultJson = JSON.parse(result._body);

      let track = new Track();
      track.artist = resultJson.artist;
      track.album = resultJson.album;
      track.title = resultJson.title;
      track.cover = resultJson.cover;

      return track
    });
  }



}
