import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import { Hangout } from '../hangouts/entity/hangout';

@Injectable()
export class DatabaseService {

  hangouts : Hangout[];

  constructor(public af: AngularFire) {}

  ngOnInit()
  {
  }


  addHangout(hangout: Hangout)
  {
    hangout.slug = this.slugify(hangout.title);   
    console.log("add hangout", hangout.slug);

    let itemObservable = this.af.database.object('/hangouts/'+hangout.slug);
    // vérifie que l'item est bien vide
    itemObservable.take(1).subscribe( (value) => {
      console.log("suscribe adding", value.slug);
      if(value.slug) 
      {
        console.log("slug déjà pris");
      }
      else
      {
        console.log("really adding hangout : ", hangout);
        itemObservable.set(hangout);
      }       
    });
  }

  getHangouts()
  {
    return this.af.database.list('/hangouts', {
              query: {
                orderByChild: 'index',
              }
            });
          
  }  

  getHangoutBySlug(slug: string) {    
    return this.af.database.object('/hangouts/'+slug);
  }

  updateHangout(hangout: Hangout) {
    console.log("updateHangout hangout key = ", hangout.slug);
    this.getHangouts().update(hangout.slug, hangout);
  }

  updateHangoutIndex(hangout: Hangout, index: number) 
  {
    if (!hangout) return;
    //console.log(`updateHangoutIndex hangout ${hangout.slug} to index ${index}`);
    this.getHangoutBySlug(hangout.slug).update({index : index});
  }

  deleteHangout(hangout: Hangout) {  

    this.deleteHangoutFromSlug(hangout.slug);
  }

  deleteHangoutFromSlug(slug: string) 
  {    
    let itemObservable2 = this.af.database.object('/hangouts/'+slug);
    // vérifie que l'item n'est pas vide
    itemObservable2.take(1).subscribe( (value) => {
      if(value.slug) 
      {
        console.log("really deleting hangout : ", slug);
        itemObservable2.remove();
      }
      else
      {
        console.log("hangout n'existe pas");
      }       
    });
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
