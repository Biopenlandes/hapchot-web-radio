import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

import { AdminItemConfig, AIType } from '../admin/shared/admin-item-config.module';

import { AdmnistrableItem }from './administrable-item';
import { Hangout }         from '../hangouts/entity/hangout';
import { Theme }           from '../podcasts/entity/theme';
import { Podcast }         from '../podcasts/entity/podcast';
import { Program }         from '../podcasts/entity/program';
import { News }            from '../news/entity/news';



@Injectable()
export class DatabaseService {

  itemType : AIType;
  ownerType : AIType;
  ownerSlug = '';

  KeyList = [
    { type: AIType.Hangout, path : "/hangouts" },
    { type: AIType.News, path : "/news" },
    { type: AIType.Podcast, path : "/podcasts" },
    { type: AIType.Program, path : "/programs" },
    { type: AIType.Theme, path : "/themes" }
  ];

  constructor(public af: AngularFire) 
  {    
  }

  getPathFromType(type : number) : string
  {
    for(var item of this.KeyList)
    {
      if (item.type == type) return item.path;
    }
    return null;
  }

  setItemType(type : AIType)
  {
    this.itemType = type; 
  }

  setOwnerType(type : AIType)
  {
    this.ownerType = type; 
  }

  setOwnerSlug(slug : string)
  {
    this.ownerSlug = slug;
  }

  getItemsFromPath(path : string) : FirebaseListObservable<AdmnistrableItem[]>
  {
    return this.af.database.list( path, {
      query: { orderByChild: 'index' }
    });
  }

  getItemsFromType(type : number) : FirebaseListObservable<AdmnistrableItem[]>
  {
    return this.getItemsFromPath(this.getPathFromType(type));
  }

  getItemsPath() : string
  {
    if (!this.ownerType)
      return this.getPathFromType(this.itemType);
    else
      return this.getPathFromType(this.ownerType) + '/'
            + this.ownerSlug + '/'
            + this.getPathFromType(this.itemType);
  }

  getItems()
  {
    return this.getItemsFromPath(this.getItemsPath());
  }

  getItemBySlug(slug: string) 
  {    
    return this.af.database.object(this.getItemsPath() + '/' + slug);
  }

  getOwners() : FirebaseListObservable<AdmnistrableItem[]>
  {
    return this.getItemsFromType(this.ownerType);
  }

  

  addItem(item: AdmnistrableItem)
  {
    console.log("DB item added : ", item);
    this.getItemBySlug(item.slug).set(item);      
  } 

  updateItem(item: AdmnistrableItem) {
    console.log("DB updateItem item", item);
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

  getHangouts() : FirebaseListObservable<Hangout[]>
  {
    return this.getItemsFromType(AIType.Hangout);
  }

  getThemes() : FirebaseListObservable<Theme[]>
  {
    return this.getItemsFromType(AIType.Theme);
  }

  getPrograms() : FirebaseListObservable<Program[]>
  {
    return this.getItemsFromType(AIType.Program);
  }

  getNews() : FirebaseListObservable<News[]>
  {
    return this.getItemsFromType(AIType.News);
  }

  getLatestPodcasts(value : number = 3) : FirebaseListObservable<Podcast[]>
  {
    return this.af.database.list(this.getPathFromType(AIType.Podcast), {
      query: { orderByChild: 'date', limitToLast: value }
    });
  }

  
}
