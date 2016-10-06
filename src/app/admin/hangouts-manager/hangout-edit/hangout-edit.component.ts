import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Hangout } from '../../../hangouts/entity/hangout';
import { DatabaseService } from '../../../shared/database.service';

@Component({
  selector: 'app-hangout-edit',
  templateUrl: './hangout-edit.component.html',
  styleUrls: ['./hangout-edit.component.scss']
})
export class HangoutEditComponent implements OnInit {

  hangout : Hangout = new Hangout();
  editMode : boolean = true;

  constructor(private db : DatabaseService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.forEach( (params: Params) => 
    {
      if (params['slug'])
      {
        this.db.getHangoutBySlug(params['slug']).take(1).subscribe(hangout => 
        {
          this.hangout = hangout; 
          console.log("edit receiving hangout", hangout);
          if (!hangout.slug)
          {
            console.log("hangout n'existe pas, redirect");
            this.redirectToNewComponent();
          }
        });
      }
      else
      {
        this.editMode = false;
      }
    });

    var vaadinUpload = document.querySelector('vaadin-upload');
    vaadinUpload.addEventListener('upload-success', 
      (event:any) => this.hangout.pictureUrl = 'assets/uploads/' + event.detail.file.name);
  }

  addHangout()
  {    
    // TODO check form complete
    if (!this.hangout.title) { console.log("hangout non rempli", this.hangout); return;}    
    
    // TODO laisser le vrai fichier uploadé dfini par vaadin dans nginit
    this.hangout.pictureUrl = "assets/uploads/image.jpg";

    let result = this.db.addHangout(this.hangout);

    if(!result) alert("ce titre est déjà pris pour une sortie !");
    else { this.redirectToListComponent(); }   
  } 

  updateHangout()
  {
    let oldHangout = this.hangout;
    this.hangout = new Hangout().getValuesFrom(oldHangout);
    this.db.deleteHangoutFromSlug(oldHangout.slug);
    this.addHangout();
  }

  redirectToListComponent()
  {
   this.router.navigate(['admin/sorties']);
  }

  redirectToNewComponent()
  {
    this.router.navigate(['admin/sorties/new']);
  }
}
