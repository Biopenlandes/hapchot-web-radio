import { Injectable } from '@angular/core';

declare var soundManager: any;

@Injectable()
export class SoundManagerService {

  mySound : any;


  constructor() { 
    soundManager.setup({
      url: '/path/to/swf-files/',
      onready: function() {
        
        
      },
      ontimeout: function() {
        // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
      }
    });
  }

  play()
  {
    this.mySound = soundManager.createSound({
          id: 'aSound',
          url: "http://www.radioking.com/play/hapchot-webradio"
        });
        this.mySound.play();
  }

  pause()
  {
    soundManager.unload('aSound');
  }

}
