import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Hangout } from '../../../hangouts/entity/hangout';

@Component({
  selector: 'app-hangout-edit',
  templateUrl: './hangout-edit.component.html',
  styleUrls: ['./hangout-edit.component.scss']
})
export class HangoutEditComponent implements OnInit {

  @Input() hangout : Hangout; 

  constructor() { }

  ngOnInit() {
    var vaadinUpload = document.querySelector('vaadin-upload');
    vaadinUpload.addEventListener('upload-success', 
      (event:any) => this.hangout.pictureUrl = 'assets/uploads/' + event.detail.file.name);
  }  
}
