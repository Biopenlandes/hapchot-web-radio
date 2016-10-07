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
  }  
}
