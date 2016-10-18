import { Component, OnInit , Input, ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { ImageContentAdmnistrableItem } from '../../../shared/image-content-administrable-item';
import { AIType } from '../../../admin/shared/admin-item-config.types';

import { SoundPlayerService } from '../../../sound-player/sound-player.service';


declare var $ : any;
declare var jQuery : any;

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit, AfterViewInit {

  @Input() item : any;
  @ViewChild('content') content : any;

  AIType = AIType;

  constructor(private soundPlayer : SoundPlayerService, private router : Router) {}

  ngOnInit() {    
  }

  ngAfterViewInit () {
    this.updateContent();
  }

  private updateContent()
  {
    let content = this.item.content ? this.item.content : this.item.description;
    if (content) 
    {      
      let maxLength = 180;
      if (content.length >= maxLength)
      {
        content = jQuery(content).text();
        content = content.slice(0, maxLength);
        content += ' (...)';
      }
      
      this.content.nativeElement.innerHTML = content;
    }
  }

  onClick()
  {
    if (this.item.type == AIType.News)
    {
      this.router.navigate(['/actu', this.item.slug]);
    }
    else if (this.item.type == AIType.Podcast)
    {
      this.soundPlayer.playPodcast(this.item);
    }
  }

}
