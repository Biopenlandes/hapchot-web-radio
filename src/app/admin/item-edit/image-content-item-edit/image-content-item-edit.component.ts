import { Component, OnInit, Input } from '@angular/core';
import { ImageContentAdmnistrableItem } from '../../../shared/image-content-administrable-item';
import { AIType } from '../../shared/admin-item-config.types';
import { AdminItemConfig } from '../../shared/admin-item-config.class';
import { Picture } from '../../../shared/picture.class';

@Component({
  selector: 'app-image-content-item-edit',
  templateUrl: './image-content-item-edit.component.html',
  styleUrls: ['./image-content-item-edit.component.scss']
})
export class ImageContentItemEditComponent implements OnInit {

  @Input() imageContentItem : ImageContentAdmnistrableItem; 
  @Input() itemConfig : AdminItemConfig;
  AIType;

  constructor() { }

  ngOnInit() {
    this.AIType = AIType;

    var vaadinUpload = document.querySelector('vaadin-upload');
    vaadinUpload.addEventListener('upload-success', 
      (event:any) => this.imageContentItem.pictures = new Picture(event.detail.file.name));
  }  

}
