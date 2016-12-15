import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DatabaseService }from '../shared/database.service';
import { Presentation }        from './presentation.class';
import { AIType } from '../admin/shared/admin-item-config.module';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

  AIType = AIType;
  presentation: Presentation = new Presentation(AIType.Presentation);

  constructor(private db : DatabaseService, private route: ActivatedRoute ) { }

  ngOnInit() {

    this.route.params.subscribe( (params : Params) => 
    {
      let suscriber;
      if (params['slug'] == "le-projet") 
      {
        suscriber = this.db.getPresentation();
      }
      else if (params['slug'] == "amis-et-partenaires") 
      {
        suscriber = this.db.getFriends();
        this.presentation = new Presentation(AIType.Friends);
      }
      else return;
      suscriber.subscribe(presentation => 
      {
         this.presentation = presentation;
         console.log("presentation", presentation);
         if (presentation.content) document.getElementById("content").innerHTML = presentation.content;
      });
    });
  }

}
