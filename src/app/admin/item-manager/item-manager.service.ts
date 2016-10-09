import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
/*import 'rxjs/add/operator/next';*/

import { AdmnistrableItem } from '../../shared/administrable-item';
import { DatabaseService } from '../../shared/database.service';
import { AdminItemConfigService, AdminItemConfig } from '../shared/admin-item-config.module';

@Injectable()
export class ItemManagerService {

  items : AdmnistrableItem[] = [];  
  owners : AdmnistrableItem[] = [];

  itemsSubject : Subject<AdmnistrableItem[]> = new Subject<AdmnistrableItem[]>();
  ownersSubject : Subject<AdmnistrableItem[]> = new Subject<AdmnistrableItem[]>();

  itemsSubscriber : Subscription;
  ownerSubscriber : Subscription;

  itemConfig : AdminItemConfig = new AdminItemConfig(0,'','','','','',false,false);
  ownerSlug : string;

  constructor(private db : DatabaseService,
              private itemConfService : AdminItemConfigService) { }

  initializeFromParams(params : Params)
  {
    // getting conf    
    this.itemConfig = this.itemConfService.getConfFromParams(params);

    if (!this.itemConfig) return false;

    if (!this.itemConfig.ownerType) this.subscribeToItems();    

    if (this.ownerSubscriber) this.ownerSubscriber.unsubscribe();
    // subscribing to owners
    if (this.itemConfig.ownerType)
    {
      this.ownerSlug = null;
      this.ownerSubscriber = this.db.getItems(this.itemConfig.ownerType).subscribe(owners => 
      {
        this.ownersSubject.next(owners);        
        //console.log("receiving owners", owners);        
        // TODO else dire qu'il faut rentrer des owners avant de remplir les items         
      });
    }

    return true;
  }

  getItemConfig() : AdminItemConfig
  {
    return this.itemConfig;
  }

  getOwnerConfig() : AdminItemConfig
  {
    return this.itemConfService.getConfFromType(this.itemConfig.ownerType);
  }

  getOwnerSlug() : string
  {
    return this.ownerSlug;
  }

  getItems() : Observable<AdmnistrableItem[]>
  {
    return this.itemsSubject;
  }

  getOwners() : Observable<AdmnistrableItem[]>
  {
    return this.ownersSubject;
  }

  private subscribeToItems()
  {
    // subscribing to Items
    if (this.itemsSubscriber) this.itemsSubscriber.unsubscribe();
    this.itemsSubscriber = this.db.getItems(this.itemConfig.type, this.itemConfig.ownerType, this.ownerSlug).subscribe( (items) => 
    {
      this.items = items; 
      //console.log("Getting items", items);
      this.itemsSubject.next(items);      
    });
  }

  onOwnerChanged(slug : string, isBeingEdited : boolean, itemBeingEdited? :AdmnistrableItem)
  {
    console.log("owner changed", slug);
    
    if (isBeingEdited)
    {
      console.log("edit en cours");
      // TODO traiter ce cas là
    }
    this.ownerSlug = slug;
    this.subscribeToItems();
  }

  private addingOwnersInfosToItem(item : AdmnistrableItem)
  {
    if (this.itemConfig.ownerType && this.ownerSlug)
    {
      item.ownerType = this.itemConfig.ownerType;
      item.ownerSlug = this.ownerSlug;
    }
  }

  addItem(item : AdmnistrableItem) : boolean
  {    
    item.slug = this.slugify(item.title); 
    this.addingOwnersInfosToItem(item);
    
    if (item.index == null)
    {
      item.index = this.itemConfig.orderAsc ? this.items.length : 0 - this.items.length;
    }

    if(this.itemExist(item.slug)) return false;

    this.db.addItem(item); 
    return true; 
  } 

  updateItem(item : AdmnistrableItem)
  {
    delete item['$key']; 
    delete item['$exists']; 
    console.log("updateItem",item);
    this.db.deleteItem(item);
    this.addItem(item);
  } 

  deleteItem(item: AdmnistrableItem)
  {
    this.addingOwnersInfosToItem(item);
    this.updateIndexesAfterDeleteingIndex(item.index);
    this.db.deleteItem(item);
  } 

  itemExist(slug: string)
  {
    return this.items.find(item => item.slug == slug);
  } 

  updateIndexesAfterDeleteingIndex(index)
  {
    if (this.itemConfig.orderAsc)
    {
      for (index = index+1; index < this.items.length; index++) {
        this.updateItemIndexTo(index, index - 1);
      }
    }
    else
    {
      for (index = index-1; index > -this.items.length; index--) {
        this.updateItemIndexTo(index, index + 1);
      }
    }
  }

  updateIndexes(oldIndex_, newIndex_)
  {
    var oldIndex, newIndex;
    // on corrige les valeurs dnas le cas d'un indexage négatif (qui simule le tri descendant)
    
    if(!this.itemConfig.orderAsc)
    {
      oldIndex = oldIndex_ - this.items.length + 1;
      newIndex = newIndex_ - this.items.length + 1;
    }
    else
    {
      oldIndex = oldIndex_;
      newIndex = newIndex_;
    }

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

  slugify (value) {    
     var rExps=[
     {re:/[\xC0-\xC6]/g, ch:'A'},
     {re:/[\xE0-\xE6]/g, ch:'a'},
     {re:/[\xC8-\xCB]/g, ch:'E'},
     {re:/[\xE8-\xEB]/g, ch:'e'},
     {re:/[\xCC-\xCF]/g, ch:'I'},
     {re:/[\xEC-\xEF]/g, ch:'i'},
     {re:/[\xD2-\xD6]/g, ch:'O'},
     {re:/[\xF2-\xF6]/g, ch:'o'},
     {re:/[\xD9-\xDC]/g, ch:'U'},
     {re:/[\xF9-\xFC]/g, ch:'u'},
     {re:/[\xC7-\xE7]/g, ch:'c'},
     {re:/[\xD1]/g, ch:'N'},
     {re:/[\xF1]/g, ch:'n'} ];
     
     // converti les caractères accentués en leurs équivalent alpha
     
     for (var i = rExps.length - 1; i >= 0; i--) {
       value=value.replace(rExps[i].re, rExps[i].ch);
     }

      return value.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .replace(/\-{2,}/g,'-');
  }

}
