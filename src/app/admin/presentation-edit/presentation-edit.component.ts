import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DatabaseService } from '../../shared/database.service';
import { AdminItemConfigService, AdminItemConfig, AIType } from '../shared/admin-item-config.module';
import { Presentation } from '../../presentation/presentation.class';

@Component({
  selector: 'app-presentation-edit',
  templateUrl: './presentation-edit.component.html',
  styleUrls: ['./presentation-edit.component.scss']
})
export class PresentationEditComponent implements OnInit {

  constructor(private db: DatabaseService,
              private configSerice: AdminItemConfigService,
              private route : ActivatedRoute) { }

  presentation : Presentation = new Presentation(AIType.Presentation);
  config : AdminItemConfig;

  ngOnInit() {

    this.route.params.subscribe( (params : Params) => 
    {
      console.log("PresentationEditComonent", params['slug']);
      let suscriber;
      if (params['slug'] == "le-projet") 
      {
        suscriber = this.db.getPresentation();
        this.presentation = new Presentation(AIType.Presentation);
        this.config = this.configSerice.getConfFromType(AIType.Presentation);
      }
      else if (params['slug'] == "amis-et-partenaires") 
      {
        suscriber = this.db.getFriends();
        this.presentation = new Presentation(AIType.Friends);
        this.config = this.configSerice.getConfFromType(AIType.Friends);
      }
      else return;
      suscriber.subscribe(pres => 
      {
        console.log("persentation", pres);
        if (pres.type) this.presentation = pres;
      });
      
    });
  }

  onItemEditDone()
  {
    
  }

}
