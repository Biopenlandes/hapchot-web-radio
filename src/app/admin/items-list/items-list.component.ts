import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdmnistrableItem } from '../../shared/administrable-item';
import { ItemManagerService } from '../item-manager/item-manager.service';
import { AdminItemConfig, AIType } from '../shared/admin-item-config.module';
import { PodcastsService } from '../../podcasts/podcasts.service';
import { Podcast } from '../../podcasts/entity/podcast';

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
  @Output() onDeleteItem = new EventEmitter<AdmnistrableItem>();
  @Output() onNewItem = new EventEmitter();

  AIType = AIType;

  constructor(private itemService : ItemManagerService, private podcastsService :PodcastsService) { }

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

  updateItem(item : AdmnistrableItem)
  {
    if (this.itemConfig.type == AIType.Podcast)
    {
      this.podcastsService.updatePodcastInfos(item as Podcast);
    }
  }

  deleteItem(item :AdmnistrableItem)
  {
    this.onDeleteItem.emit(item);
  }
}
