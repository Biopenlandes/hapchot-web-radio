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

  private getPathFromType(type : number) : string
  {
    for(var item of this.KeyList)
    {
      if (item.type == type) return item.path;
    }
    return null;
  }

  private getItemsFromPath(path : string) : FirebaseListObservable<AdmnistrableItem[]>
  {
    return this.af.database.list( path, {
      query: { orderByChild: 'index' }
    });
  }

  getItems(type : AIType, ownerType? : AIType, ownerSlug? : string) : FirebaseListObservable<AdmnistrableItem[]>
  {
    if (ownerType && ownerSlug) return this.getItemsInOwnerSlug(type, ownerType, ownerSlug);
    return this.getItemsFromPath(this.getPathFromType(type));    
  }

  getOwners(type : AIType) : FirebaseListObservable<AdmnistrableItem[]>
  {
    return this.af.database.list( this.getPathFromType(type), {
      query: { orderByChild: 'index' }
    });   
  }

  getItemsInOwnerSlug(itemType :AIType, ownerType : AIType, ownerSlug : string)
  {
    let itemsPath = this.getItemsPathWithOwnerSlug(itemType, ownerType, ownerSlug);
    return this.getItemsFromPath(itemsPath);
  }

  getItem(itemType : AIType, slug: string) 
  {    
    return this.af.database.object(this.getPathFromType(itemType) + '/' + slug);
  }

  getDbItem(item : AdmnistrableItem)
  {
    return this.af.database.object(this.getPathFromType(item.type) + '/' + item.slug);
  }

  getDbItemInOwnerSlug(item : AdmnistrableItem) 
  {    
    let itemsPath = this.getItemsPathWithOwnerSlug(item.type, item.ownerType, item.ownerSlug);
    return this.af.database.object(itemsPath + '/' + item.slug);
  }

  private getItemsPathWithOwnerSlug(itemType :AIType, ownerType : AIType, ownerSlug : string) : string
  {
    return this.getPathFromType(ownerType) + '/'
         + ownerSlug + '/'
         + this.getPathFromType(itemType);    
  }


  addItem(item: AdmnistrableItem)
  {
    console.log("DB item added : ", item);
    this.getDbItem(item).set(item);
    if (item.ownerType) this.getDbItemInOwnerSlug(item).set(item);      
  } 

  updateItem(item: AdmnistrableItem) {
    console.log("DB updateItem item", item);

    this.getItems(item.type).update(item.slug, item);
    if (item.ownerType) this.getItemsInOwnerSlug(item.type, item.ownerType, item.ownerSlug).update(item.slug, item);
  }

  updateItemIndex(item: AdmnistrableItem, index: number) 
  {
    if (!item) return;
    console.log(`updateItemIndex item ${item.slug} to index ${index}`);
    this.getDbItem(item).update({index : index});
    if (item.ownerType) this.getDbItemInOwnerSlug(item).update({index : index});
  }

  deleteItem(item: AdmnistrableItem) { 
    console.log("deleting item", item);
    this.deleteDbItem(this.getDbItem(item));
    if (item.ownerType) this.deleteDbItem(this.getDbItemInOwnerSlug(item));
  }

  private deleteDbItem(dbItem: FirebaseObjectObservable<any>) 
  {    
    if (dbItem) dbItem.remove();
    else console.log("delete item, ce item n'existe pas");
  }

  getHangouts() : FirebaseListObservable<Hangout[]>
  {
    return this.getItems(AIType.Hangout);
  }

  getThemes() : FirebaseListObservable<Theme[]>
  {
    return this.getItems(AIType.Theme);
  }

  getPrograms() : FirebaseListObservable<Program[]>
  {
    return this.getItems(AIType.Program);
  }

  getNews() : FirebaseListObservable<News[]>
  {
    return this.getItems(AIType.News);
  }

  getLatestPodcasts(value : number = 3) : Observable<Podcast[]>
  {
    return this.af.database.list(this.getPathFromType(AIType.Podcast), {
      query: { orderByChild: 'updatedTime', limitToLast: value }
    }).map(array =>
    {
      return array.reverse();
    });
  }

  
}
