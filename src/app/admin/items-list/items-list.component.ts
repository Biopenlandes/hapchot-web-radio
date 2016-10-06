import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AdmnistrableItem } from '../../shared/administrable-item';
import { DatabaseService } from '../../shared/database.service';
import { AdminItemConfig, getAdminItemConfigFromRoute } from '../../shared/administrable-items-type';


declare var Sortable : any;
declare var $ : any;

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  items : AdmnistrableItem[] = [];
  subscription : Subscription;
  itemConfig : AdminItemConfig;

  constructor(private db : DatabaseService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() 
  {
    // getting conf
    this.itemConfig = getAdminItemConfigFromRoute(this.route.snapshot.params['itemType']);
    if (this.itemConfig == null) this.router.navigate(['admin']);
    else
    {
      this.db.setItemConfig(this.itemConfig);        
    } 

    // subscribing to Items
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = this.db.getItems().subscribe( (items) => {this.items = items; /*console.log("LIST subscribe", items);*/} );

    // Activating Sortable List
    var itemsListDOM = document.getElementById('items-list');
    Sortable.create(itemsListDOM, {
      onSort: (evt) => this.updateIndexes(evt.oldIndex, evt.newIndex)
    }); 
  }

  editItem(item: AdmnistrableItem)
  {
    this.router.navigate(['edit', item.slug], { relativeTo : this.route});
  } 
   

  deleteItem(item: AdmnistrableItem)
  {
    this.updateIndexes(item.index, this.items.length);
    this.db.deleteItem(item);
  }
  
  updateIndexes(oldIndex, newIndex)
  {
    console.log("on sort");
    let itemMoved = this.getItemByIndex(oldIndex);

    var index;
    if (newIndex < oldIndex)
    {      
      for (index = oldIndex - 1; index >= newIndex; index--) {
        this.updateItemIndexTo(index, index + 1);
      }
    }
    else
    {
      for (index = oldIndex + 1; index <= newIndex; index++) {
        this.updateItemIndexTo(index, index - 1);
      }
    }

    this.db.updateItemIndex(itemMoved, newIndex);
  }

  updateItemIndexTo(itemIndex : number, newIndex : number)
  {
    this.db.updateItemIndex(this.getItemByIndex(itemIndex), newIndex);
  }

  getItemByIndex(index : number) : AdmnistrableItem
  {
    return this.items.find( (item) => item.index == index);
  }

}
