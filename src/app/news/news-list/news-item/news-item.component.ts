import { Component, OnInit , Input, ViewChild, AfterViewInit} from '@angular/core';
import { ImageContentAdmnistrableItem } from '../../../shared/image-content-administrable-item';
import { AIType } from '../../../admin/shared/admin-item-config.types';


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

  constructor() {}

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

}
