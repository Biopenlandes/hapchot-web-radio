import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';

import { AdmnistrableItem } from '../../shared/administrable-item';
import { DatabaseService } from '../../shared/database.service';
import { AdminItemConfig, AIType, AdminItemConfigService } from '../shared/admin-item-config.module';


@Injectable()
export class ItemManagerResolve implements Resolve<AdminItemConfig> {

  constructor(private router: Router,
              private itemConfService : AdminItemConfigService) {}

  resolve(route: ActivatedRouteSnapshot): AdminItemConfig|boolean 
  {
    console.log("Item resolve begin");  
    let itemConfig = this.itemConfService.getConfFromRoute(route.params['itemType']);
    if (itemConfig == null) 
    {
      this.router.navigate(['admin']);
      return false;
    }
    else
    {
      return itemConfig;       
    } 
  }
}
