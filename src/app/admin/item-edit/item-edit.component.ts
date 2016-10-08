import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdmnistrableItem } from '../../shared/administrable-item';
import { AdminItemConfig, AIType } from '../shared/admin-item-config.module';
import { ItemManagerService } from '../item-manager/item-manager.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  @Input() item : AdmnistrableItem = new AdmnistrableItem();
  @Input() itemConfig : AdminItemConfig;
  @Input() editMode : boolean = true;
  @Output() onItemEditDone = new EventEmitter();
  AIType;

  constructor(private itemService : ItemManagerService) {}

  ngOnInit() 
  { 
    this.AIType = AIType;  
  }

  addItem()
  {    
    // TODO check form complete
    if (!this.item.title) { console.log("item non rempli", this.item); return;}    

    let result = this.itemService.addItem(this.item);

    if(!result) alert("ce titre est déjà pris pour une sortie !");
    else { this.onItemEditDone.emit(); }  
  } 

  updateItem()
  {
    this.itemService.updateItem(this.item);
    this.onItemEditDone.emit();
  } 

}
