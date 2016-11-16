import { Component, OnInit } from '@angular/core';

import { MatchMediaService } from '../shared/match-media.service';
import { Hangout } from '../hangouts/entity/hangout';

declare var $ : any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private matchMediaService : MatchMediaService) { }

  ngOnInit() {
  }

}
