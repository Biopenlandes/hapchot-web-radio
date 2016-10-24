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

  onDateChange(value: any)
  {
    this.hangout.dateTimestamp = new Date(value).getTime();
  }

  getDate()
  {
    var options = {weekday: "long", month: "long", day: "numeric"};
    return new Date(this.hangout.dateTimestamp).toLocaleDateString("fr-FR", options);
  }
}
