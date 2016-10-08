import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdmnistrableItem } from '../../shared/administrable-item';
import { ItemManagerService } from '../item-manager/item-manager.service';
import { AdminItemConfig } from '../shared/admin-item-config.module';

declare var Sortable : any;

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  @Input() items : AdmnistrableItem[] = [];
  @Input() itemConfig : AdminItemConfig;
  @Output() onEditItem = new EventEmitter<AdmnistrableItem>();
  @Output() onNewItem = new EventEmitter();

  constructor(private itemService : ItemManagerService) { }

  ngOnInit() 
  {
    console.log("itemList ngOninit")
    // Activating Sortable List
    var itemsListDOM = document.getElementById('items-list');
    Sortable.create(itemsListDOM, {
      onSort: (evt) => this.itemService.updateIndexes(evt.oldIndex, evt.newIndex)
    }); 
  } 

  newItem()
  {
    this.onNewItem.emit();
  }

  editItem(item :AdmnistrableItem)
  {
    this.onEditItem.emit(item);
  }

  deleteItem(item :AdmnistrableItem)
  {
    this.itemService.deleteItem(item);
  }
}
