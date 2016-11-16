import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatchMediaService } from '../shared/match-media.service';


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor(private matchMediaService : MatchMediaService) { }

  ngOnInit() {
  }

}
