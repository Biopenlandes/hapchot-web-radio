import { Component, OnInit , Input, ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { ImageContentAdmnistrableItem } from '../../../shared/image-content-administrable-item';
import { AIType } from '../../../admin/shared/admin-item-config.types';

import { SoundPlayerService } from '../../../sound-player/sound-player.service';
import { MatchMediaService } from '../../../shared/match-media.service';

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

  constructor(private soundPlayer : SoundPlayerService, 
              private router : Router,
              private matchMedia : MatchMediaService) {}

  ngOnInit() {  
    //console.log("ngOnInit news item", this.item.description); 
  }

  ngAfterViewInit () {
    //console.log("ngAfterViewInit news item");    
    this.updateContent();
  }

  private updateContent()
  {
    //console.log("updateContent");
    let content_ = this.item.content; 
    if (content_) 
    {      
      let maxLength = 160;
      content_ = jQuery(content_).text();
      //console.log("updateContent", content_);
      if (content_.length >= maxLength)
      {        
        content_ = content_.slice(0, maxLength);
        content_ += '... (suite)';
      }
      
      this.content.nativeElement.innerHTML = content_;
    }
    else console.log("pas item content");
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
