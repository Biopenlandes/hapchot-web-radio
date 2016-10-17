import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DatabaseService } from '../../shared/database.service';
import { Program } from '../entity/program';
import { Podcast } from '../entity/podcast';
import { SoundPlayerService } from '../../sound-player/sound-player.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  program : Program = new Program();

  constructor(private route: ActivatedRoute, 
              private db : DatabaseService,
              private soundPlayer : SoundPlayerService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => 
    {
       let slug = params['slug']; // (+) converts string 'id' to a number
       console.log("slug", slug);
       this.db.getProgramFromSlug(slug).subscribe(program => 
       {
           this.program = program;
           console.log("program", program);
           document.getElementById("content").innerHTML = program.content;
       });
    });
  }

  onPlay(podcast : Podcast)
  {
    this.soundPlayer.playPodcast(podcast);
  }

}
