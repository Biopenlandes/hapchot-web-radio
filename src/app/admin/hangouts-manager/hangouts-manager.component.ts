import { Component, OnInit } from '@angular/core';

import {FirebaseListObservable} from 'angularfire2';

import { Hangout } from '../../hangouts/entity/hangout';
import { DatabaseService } from '../../shared/database.service';

@Component({
  selector: 'app-hangouts-manager',
  templateUrl: './hangouts-manager.component.html',
  styleUrls: ['./hangouts-manager.component.scss']
})
export class HangoutsManagerComponent implements OnInit {

  hangout : Hangout;
  editMode : boolean = false;
  editHangoutKey : string = '';

  hangouts: FirebaseListObservable<Hangout[]>;

  constructor(private db : DatabaseService) { }

  ngOnInit() {
    this.initAddingMode();
    this.hangouts = this.db.getHangouts();
  }

  addHangout()
  {
    this.db.addHangout(this.hangout);
  }

  deleteHangout(key: string)
  {
    this.db.deleteHangout(key);
  }

  private initAddingMode()
  {
    this.editMode = false;
    this.hangout = new Hangout('','','');
  }

  editHangout(key: string)
  {
    this.db.getHangoutByKey(key).take(1).subscribe( (hangout) => 
    {
      this.hangout = new Hangout(hangout.title, hangout.pictureUrl, hangout.content);
      this.editMode = true;
      this.editHangoutKey = key;
    });
  }
  
  updateHangout()
  {
    this.db.updateHangout(this.editHangoutKey, this.hangout);
  }

}
