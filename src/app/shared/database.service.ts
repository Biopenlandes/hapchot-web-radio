import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import { Hangout } from '../hangouts/entity/hangout';

@Injectable()
export class DatabaseService {


  constructor(public af: AngularFire) {}

  ngOnInit()
  {
  }

  getHangouts()
  {
    return this.af.database.list('/hangouts');
  }
  getHangoutByKey(key: string) {    
    return this.af.database.object('/hangouts/'+key);
  }
  addHangout(hangout: Hangout) {
    this.getHangouts().push(hangout);
  }
  updateHangout(key: string, hangout: Hangout) {
    console.log("updateHangout key",key);
    console.log("updateHangout hangout",hangout);
    this.getHangouts().update(key, hangout);
  }
  deleteHangout(key: string) {    
    this.getHangouts().remove(key); 
  }
}
