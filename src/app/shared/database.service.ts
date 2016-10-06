import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';

import { AdminItemConfig, AIType, getAdminItemConfigFromRoute } from './administrable-items-type';
import { Hangout } from '../hangouts/entity/hangout';
import { AdmnistrableItem } from './administrable-item';

@Injectable()
export class DatabaseService {

  items : AdmnistrableItem[] = [];
  itemConfig : AdminItemConfig;
  subscription: Subscription;

  constructor(public af: AngularFire) 
  {    
  }

  getItemConfig() : AdminItemConfig
  {
    return this.itemConfig;
  }

  setItemConfig(config : AdminItemConfig)
  {
    if (this.subscription) this.subscription.unsubscribe();
    this.itemConfig = config;
    this.subscription = this.af.database.list(this.itemConfig.dbKey).subscribe(items => this.items = items);
  }

  addItem(item: AdmnistrableItem)
  {
    item.slug = this.slugify(item.title); 
    
    if (item.index < 0)
    {
      item.index = this.items.length; 
    }

    if(this.itemExist(item.slug)) 
    {
      console.log("DB slug déjà pris");
      return false;
    }
    else
    {
      console.log("DB item added : ", item);
      this.getItemBySlug(item.slug).set(item);
      return true;
    }         
  }

  getItems()
  {
     return this.af.database.list(this.itemConfig.dbKey, {
              query: {
                orderByChild: 'index',
              }
            })
  }

  getItemBySlug(slug: string) {    
    return this.af.database.object(this.itemConfig.dbKey+'/'+slug);
  }

  itemExist(slug: string)
  {
    return this.items.find(item => item.slug === slug);
  }  

  updateItem(item: AdmnistrableItem) {
    console.log("updateItem item", item);
    this.getItems().update(item.slug, item);
  }

  updateItemIndex(item: AdmnistrableItem, index: number) 
  {
    if (!item) return;
    //console.log(`updateItemIndex item ${item.slug} to index ${index}`);
    this.getItemBySlug(item.slug).update({index : index});
  }

  deleteItem(item: AdmnistrableItem) {  

    this.deleteItemFromSlug(item.slug);
  }

  deleteItemFromSlug(slug: string) 
  {    
    if (this.getItemBySlug(slug))
    {
      this.getItemBySlug(slug).remove();
    }
    else
    {
      console.log("delete item, ce item n'existe pas");
    }
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
    };
}
