import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Track } from './track.class';
import { DatabaseService } from "../shared/database.service";
import { Podcast } from '../podcasts/entity/podcast';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare var soundManager: any;
declare var Mixcloud: any;

const radioStream = "http://www.radioking.com/play/hapchot-webradio";
const radioInfosUrl = 'https://www.radioking.com/widgets/currenttrack.php?radio=3046&format=json';


const checkRadioTrackIntevalSeconde = 15;
const checkNextProgramIntevalSeconde = 12;


export enum RadioState
{
  Stopped, Loading, Playing
}
@Injectable()
export class SoundPlayerService {

  radio : any;
  mixcloudPlayer : any;
  isMixclouPayerInitialized : boolean = false;
  modeRadio : boolean = true;
  modeRadioStream : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  radioState : RadioState = RadioState.Stopped;
  radioStateStream : BehaviorSubject<RadioState> = new BehaviorSubject<RadioState>(RadioState.Stopped);
  radioTrackStream : BehaviorSubject<Track> = new BehaviorSubject<Track>(new Track());
  checkTrackTimer;

  nextProgramStream : BehaviorSubject<any> = new BehaviorSubject<any>({});
  nextProgramTimer;

  constructor(private http : Http, private db :DatabaseService) { 
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

    this.radioStateStream.subscribe(state =>
    {
      switch (state) {
        case RadioState.Loading:
          this.getTrackFromRadioKing()
          this.checkTrackTimer = setInterval(() => this.getTrackFromRadioKing(), checkRadioTrackIntevalSeconde * 1000);
          break;
        case RadioState.Stopped:
          if (this.checkTrackTimer) clearInterval(this.checkTrackTimer);
          break;
      }
    });  

    this.checkNextProgram();
    setInterval(() => this.checkNextProgram(), checkNextProgramIntevalSeconde * 1000);
  }

  // -----------------
  //      PODCAST
  // -----------------

  initMixcloudPlayer(mixcloudFrame)
  {
    this.mixcloudPlayer = Mixcloud.PlayerWidget(mixcloudFrame);
    this.mixcloudPlayer.ready.then(() => this.isMixclouPayerInitialized = true);
  }

  playPodcast(podcast : Podcast)
  {
    if (this.isMixclouPayerInitialized) 
    {
      this.stopRadio();
      this.setModeRadio(false);
      this.mixcloudPlayer.load(podcast.key, true);

      let track = new Track();
      track.title = podcast.key;
      track.cover = podcast.pictures.large;

      this.radioTrackStream.next(track)
    }
    else console.log("Mixcloud is not yet initialized");    
  }

  pausePodcast()
  {
    if (this.isMixclouPayerInitialized) this.mixcloudPlayer.pause();
    else console.log("Mixcloud is not yet initialized");
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

  getNextProgram(): Observable<any>
  {
    return this.nextProgramStream.asObservable();
  }

  toggleRadio()
  {
    if( this.radioState == RadioState.Playing) this.stopRadio();
    else this.playRadio();
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
    return this.radioTrackStream.asObservable();    
  }

  private getTrackFromRadioKing()
  {
    //console.log("GetTrackFromRadioKing", this.http);
    this.http.get(radioInfosUrl).map( (result:any) =>
    {
      let resultJson = JSON.parse(result._body);

      let track = new Track();
      track.artist = resultJson.artist;
      track.album = resultJson.album;
      track.title = resultJson.title;
      track.cover = resultJson.cover;

      return track
    }).toPromise().then(track => this.radioTrackStream.next(track));
  }

  private checkNextProgram()
  {
    //console.log("checkNextProgram");
    this.db.getNextProgram().take(1).subscribe( (events:any) =>
    {
      if (!events[0]) return;
      //console.log("checkNextProgram getting events");
      let event = events[0];
      let NextProgram : any = {};
      NextProgram.start_date = event.start_date;
      this.db.getProgramFromSlug(event.slug).take(1).subscribe(program =>
      {
        //console.log("checkNextProgram getting Program");
        NextProgram.title = program.title;
        this.nextProgramStream.next(NextProgram);
      });
    });
  }
}
