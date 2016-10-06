import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Hangout } from '../../hangouts/entity/hangout';
import { AdmnistrableItem } from '../../shared/administrable-item';
import { DatabaseService } from '../../shared/database.service';

declare var Sortable : any;
declare var $ : any;

@Component({
  selector: 'app-hangouts-manager',
  templateUrl: './hangouts-manager.component.html',
  styleUrls: ['./hangouts-manager.component.scss'],
})
export class HangoutsManagerComponent implements OnInit {  
  
  hangouts: Hangout[] = [];
  items : AdmnistrableItem[] = [];

  constructor(private db : DatabaseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.forEach( (params: Params) => 
    {
      
      switch (params['itemType'])
      {
        case "sorties":
          
          break;
        default:

          break;
      }      
    });

    this.db.getHangouts().subscribe( (hangouts) => this.hangouts = hangouts );

    var hangoutsListDOM = document.getElementById('hangouts-list');
    Sortable.create(hangoutsListDOM, {
      onSort: (evt) => this.updateIndexes(evt.oldIndex, evt.newIndex)
    });    
  }  

  editHangout(hangout: Hangout)
  {
    this.router.navigate(['edit', hangout.slug], { relativeTo : this.route});
  } 
   

  deleteHangout(hangout: Hangout)
  {
    this.updateIndexes(hangout.index, this.hangouts.length);
    this.db.deleteHangout(hangout);
  }
  
  updateIndexes(oldIndex, newIndex)
  {
    let hangoutMoved = this.getHangoutByIndex(oldIndex);

    var index;
    if (newIndex < oldIndex)
    {      
      for (index = oldIndex - 1; index >= newIndex; index--) {
        this.updateHangoutIndexTo(index, index + 1);
      }
    }
    else
    {
      for (index = oldIndex + 1; index <= newIndex; index++) {
        this.updateHangoutIndexTo(index, index - 1);
      }
    }

    this.db.updateHangoutIndex(hangoutMoved, newIndex);
  }

  updateHangoutIndexTo(hangoutIndex : number, newIndex : number)
  {
    this.db.updateHangoutIndex(this.getHangoutByIndex(hangoutIndex), newIndex);
  }

  getHangoutByIndex(index : number) : Hangout
  {
    return this.hangouts.find( (hangout) => hangout.index == index);
  }

  

  /*scrollTop()
  {
    $('html, body').animate( { scrollTop: 0 }, 500 );
  }

  scrollToNewHangout()
  {
    $('html, body').animate( { scrollTop: $('#edit').offset().top }, 500 );
  }*/

}
