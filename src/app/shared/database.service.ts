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
import { Presentation }    from '../presentation/presentation.class';



@Injectable()
export class DatabaseService {

  KeyList = [
    { type: AIType.Hangout, path : "/hangouts" },
    { type: AIType.News, path : "/news" },
    { type: AIType.Podcast, path : "/podcasts" },
    { type: AIType.Program, path : "/programs" },
    { type: AIType.Theme, path : "/themes" },
    { type: AIType.Presentation, path : "/presentation" }
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

  getDbItemsInOwnerSlug(item :AdmnistrableItem)
  {
    return this.getItemsInOwnerSlug(item.type, item.ownerType, item.ownerSlug);
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

  addNewsletterAddress(mail : string)
  {
    this.af.database.list('/mails').push(mail);
  }

  deleteNewsletterAdresses()
  {
    this.af.database.list('/mails').remove();
  }

  getNewsletterAdresses() : Observable<string[]>
  {
    return this.af.database.list('/mails');
  }

  addItem(item: AdmnistrableItem)
  {
    console.log("DB item added : ", item);
    if (item.type == AIType.Presentation)
    {
      console.log("Presentation adding item", this.getPathFromType(AIType.Presentation));
      this.getPresentation().set(item);
      return;
    }

    this.getDbItem(item).set(item);
    if (item.ownerType) 
    {
      console.log("DB item added in owner : ", item.ownerSlug);
      this.getDbItemInOwnerSlug(item).set(item); 

      // getting the owner
      this.getItem(item.ownerType, item.ownerSlug).take(1).subscribe(itemOwner =>
      {
        console.log("owner", itemOwner);
        if (itemOwner.ownerType)
        {
          console.log("owner has owner : ", itemOwner.ownerSlug);
          delete itemOwner['$key']; 
          delete itemOwner['$exists'];
          //this.deleteItem(itemOwner);
          this.getDbItemInOwnerSlug(itemOwner).set(itemOwner); 
        }
      });
    }

  } 

  updateItem(item: AdmnistrableItem) {
    console.log("DB updateItem item", item);

    this.getItems(item.type).update(item.slug, item);
    if (item.ownerType) this.getDbItemsInOwnerSlug(item).update(item.slug, item);
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
    if (item.type == AIType.Presentation)
    {
      this.getPresentation().remove();
      return;
    }
    this.deleteDbItem(this.getDbItem(item));
    if (item.ownerType) this.deleteDbItem(this.getDbItemInOwnerSlug(item));
  }

  private deleteDbItem(dbItem: FirebaseObjectObservable<any>) 
  {    
    if (dbItem) dbItem.remove();
    else console.log("delete item, ce item n'existe pas");
  }

  getHangouts(value ? : number) : Observable<Hangout[]>
  {
    return this.af.database.list(this.getPathFromType(AIType.Hangout), {
      query: { orderByChild: 'dateTimestamp' }
    }).map((items : Hangout[]) =>
    {
      let now = Date.now();
      let newItems = items.filter(item => item.publishOn < now && item.dateTimestamp > now);
      if (value && newItems.length > value)
      {
        newItems = newItems.slice(0,value);
      }
      return newItems;
    });
  }

  getHangoutFromSlug(slug : string) : Observable<Hangout>
  {
    return this.getItem(AIType.Hangout, slug);
  }  

  getThemes() : Observable<Theme[]>
  {
    return this.getItems(AIType.Theme).map( (items : Theme[]) => 
    {
      for(let item of items)
      {
        item.programs = this.transformObjectToArray(item.programs);
      }
      return items;
    });
  }

  getProgramFromSlug(slug : string) : Observable<Program>
  {
    return this.getItem(AIType.Program, slug).map( (item : Program) => 
    {
      item.podcasts = this.transformObjectToArray(item.podcasts);
      return item;
    });
  }  

  getPrograms() : Observable<Program[]>
  {
    return this.getItems(AIType.Program).map( (items : Program[]) => 
    {
      for(let item of items)
      {
        item.podcasts = this.transformObjectToArray(item.podcasts);
      }
      return items;
    });
  }  

  getNews() : Observable<News[]>
  {
    return this.af.database.list(this.getPathFromType(AIType.News), {
      query: { orderByChild: 'publishOn' }
    }).map(array =>
    {
      let now = Date.now();
      return array.filter(item => item.publishOn < now).reverse();
    });
  }

  getNewsFromSlug(slug : string) : Observable<News>
  {
    return this.getItem(AIType.News, slug);
  }  

  getLatestPodcasts(value : number = 3) : Observable<Podcast[]>
  {
    return this.af.database.list(this.getPathFromType(AIType.Podcast), {
      query: { orderByChild: 'updatedTime', limitToLast: value }
    }).map(array =>
    {
      let now = Date.now();
      return array.filter(item => item.publishOn < now).reverse();
    });
  }

  getPresentation() : FirebaseObjectObservable<Presentation>
  {
    return this.af.database.object(this.getPathFromType(AIType.Presentation));
  }

  private transformObjectToArray(object)
  {
    let array = [];
    for(var key in object)
    {
      array.push(object[key]);
    }
    return array.sort( (a, b) => a.index - b.index );
  }

  getNextProgram() : Observable<any>
  {
    return this.af.database.list("events/", {
      query: { orderByChild: 'start_date' }
    }).map(array =>
    {
      let now = Date.now();
      return array.filter(item => item.start_date > now);      
    });
  }

  
}
