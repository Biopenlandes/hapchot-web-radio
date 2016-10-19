import { Component, OnInit } from '@angular/core';


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
              private configSerice: AdminItemConfigService) { }

  presentation : Presentation = new Presentation();
  config : AdminItemConfig;

  ngOnInit() {
    this.db.getPresentation().subscribe(pres => 
    {
      console.log("persentation", pres);
      if (pres.type) this.presentation = pres;
    });
    this.config = this.configSerice.getConfFromType(AIType.Presentation);
  }

  onItemEditDone()
  {
    
  }

}
