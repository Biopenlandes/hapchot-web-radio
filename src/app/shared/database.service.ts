import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import { Hangout } from '../hangouts/entity/hangout';

@Injectable()
export class DatabaseService {

  hangouts : Hangout[];

  constructor(public af: AngularFire) 
  {
    console.log("DB constructor");
    this.getHangouts().subscribe(hangouts => {this.hangouts = hangouts;console.log("DB hangouts", hangouts)});
  }

  addHangout(hangout: Hangout)
  {
    hangout.slug = this.slugify(hangout.title); 

    if (!hangout.index)
    {
      hangout.index = this.hangouts.length; 
    }

    if(this.hangoutExist(hangout.slug)) 
    {
      console.log("DB slug déjà pris");
      return false;
    }
    else
    {
      console.log("DB adding hangout : ", hangout);
      this.getHangoutBySlug(hangout.slug).set(hangout);
      return true;
    }         
  }

  getHangouts()
  {
     return this.af.database.list('/hangouts', {
              query: {
                orderByChild: 'index',
              }
            })
  }

  getHangoutBySlug(slug: string) {    
    return this.af.database.object('/hangouts/'+slug);
  }

  hangoutExist(slug: string)
  {
    return this.hangouts.find(hangout => hangout.slug === slug);
  }  

  updateHangout(hangout: Hangout) {
    console.log("updateHangout hangout", hangout);
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
    if (this.getHangoutBySlug(slug))
    {
      this.getHangoutBySlug(slug).remove();
    }
    else
    {
      console.log("delete hangout, ce hangout n'existe pas");
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
