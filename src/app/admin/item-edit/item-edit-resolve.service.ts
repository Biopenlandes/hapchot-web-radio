import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import { AdmnistrableItem } from '../../shared/administrable-item';
import { DatabaseService } from '../../shared/database.service';
import { AdminItemConfig, AIType, getAdminItemConfigFromRoute } from '../../shared/administrable-items-type';


@Injectable()
export class ItemEditResolve implements Resolve<AdmnistrableItem> {

  constructor(private db: DatabaseService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<AdmnistrableItem>|boolean 
  {
    console.log("editItem resolve begin");  
    let itemConfig = getAdminItemConfigFromRoute(route.params['itemType']);
    if (itemConfig == null) this.router.navigate(['admin']);
    else
    {
      this.db.setItemConfig(itemConfig);        
    } 

    if (!route.params['slug'])
    {
     console.log("Resolve guard pas de slug on envoie un item vide");
     return Promise.resolve(new AdmnistrableItem()); 
    }    

    return this.db.getItemBySlug(route.params['slug']).map(item => 
    {
      console.log("Resolve guard fetching item", item);
      if (item.slug) return item;
      else
      {   
        console.log("Resolve guard fetching item is null redirect vers new");
        this.router.navigate(['../new']);         
        return false;
      }
    }).first();/*.subscribe(item =>
    {      
      
    }) as Observable<AdmnistrableItem>;*/
    
  }
}
