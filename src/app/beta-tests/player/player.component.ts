import { Component, OnInit } from '@angular/core';
import { SoundManagerService } from './sound-manager.service';

declare var Mixcloud: any;
declare var scheduler: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(private soundManager : SoundManagerService) { }

  widget : any;

  ngOnInit() {
    this.widget = Mixcloud.PlayerWidget(document.getElementById('my-frame'));
    this.widget.ready.then(function() {
        console.log("HEY MIXLOUD");
    });
    console.log('initScheduler');
    scheduler.init('scheduler_here', new Date(),"month");
  }

  load()
  {
    this.widget.load('/hapchot/lheure-du-live-pepper-lils/', true).then( () => console.log("LODAED"));
  }



}
