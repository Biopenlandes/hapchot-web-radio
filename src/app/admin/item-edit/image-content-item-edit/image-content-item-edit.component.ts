import { Component, OnInit, Input } from '@angular/core';
import { ImageContentAdmnistrableItem } from '../../../shared/image-content-administrable-item';
import { AIType } from '../../shared/admin-item-config.types';
import { AdminItemConfig } from '../../shared/admin-item-config.class';
import { Picture } from '../../../shared/picture.class';

declare var $ : any;

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

    if (!this.imageContentItem.publishOn) this.imageContentItem.publishOn = Date.now();
/*    
    var vaadinDatePicker : any;
    vaadinDatePicker = document.querySelector('vaadin-upload');
    vaadinDatePicker.addEventListener('value-changed', 
      (event:any) =>  {console.log('Selected: ' + vaadinDatePicker.value);this.imageContentItem.publishOn = vaadinDatePicker.value;
    });

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });*/

    var vaadinUpload = document.querySelector('vaadin-upload');
    vaadinUpload.addEventListener('upload-success', 
      (event:any) => {console.log("upload success",event.detail.file.name);this.imageContentItem.pictures = new Picture(event.detail.file.name);});
  }  

  onDateChange(value: any)
  {
    this.imageContentItem.publishOn = new Date(value).getTime();
  }

  getDate()
  {
    var options = {weekday: "long", month: "long", day: "numeric", year:"numeric"};
    return new Date(this.imageContentItem.publishOn).toLocaleDateString("fr-FR", options);
  }

}
