import { Component, OnInit } from '@angular/core';


import {FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Hangout } from '../../hangouts/entity/hangout';
import { DatabaseService } from '../../shared/database.service';

declare var Sortable : any;
declare var $ : any;

@Component({
  selector: 'app-hangouts-manager',
  templateUrl: './hangouts-manager.component.html',
  styleUrls: ['./hangouts-manager.component.scss'],
})
export class HangoutsManagerComponent implements OnInit {

  hangout : Hangout;
  staticHangouts : Hangout[];
  editMode : boolean = false;
  nbreHangouts : number = 0;
  currEditingHangoutKey : string = '';
  
  hangouts: Hangout[] = [];

  constructor(private db : DatabaseService) { }

  ngOnInit() {
    this.initAddingMode();

    this.db.getHangouts().subscribe( (hangouts) => this.hangouts = hangouts );

    //this.hangouts = this.db.getHangouts();

    var hangoutsListDOM = document.getElementById('hangouts-list');
    Sortable.create(hangoutsListDOM, {
      onSort: (evt) => this.updateIndexes(evt.oldIndex, evt.newIndex)
    });

    var vaadinUpload = document.querySelector('vaadin-upload');
    vaadinUpload.addEventListener('upload-success', 
      (event:any) => this.hangout.pictureUrl = 'assets/uploads/' + event.detail.file.name);
  }  
  
  initAddingMode()
  {
    this.editMode = false;
    this.hangout = new Hangout();
  }

  editHangout(hangout: Hangout)
  {
      this.hangout = hangout;
      this.editMode = true;
      this.currEditingHangoutKey = hangout.slug;
  }

  addHangout()
  {    
    // TODO check form complete
    if (!this.hangout.title) { alert("hangout non rempli"); return;}
    // for new hangout put index 
    if (!this.hangout.index) this.hangout.index = this.hangouts.length;
    
    // TODO laisser le vrai fichier uploadé dfini par vaadin dans nginit
    this.hangout.pictureUrl = "assets/uploads/image.jpg";
    
    let result = this.db.addHangout(this.hangout);
    // TODO ne marche pas
    /*console.log('result', result);
    if(!result) alert("ce titre est déjà pris pour une sortie !");
    else { this.initAddingMode();this.scrollTop();}*/

    this.initAddingMode();this.scrollTop();
  }  

  deleteHangout(hangout: Hangout)
  {
    this.updateIndexes(hangout.index, this.hangouts.length);
    this.db.deleteHangout(hangout);
  }

  updateHangout()
  {
    this.db.deleteHangoutFromSlug(this.currEditingHangoutKey);
    this.addHangout();
    this.initAddingMode();
    this.scrollTop();
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

  scrollTop()
  {
    $('html, body').animate( { scrollTop: 0 }, 500 );
  }

  scrollToNewHangout()
  {
    $('html, body').animate( { scrollTop: $('#edit').offset().top }, 500 );
  }

}
