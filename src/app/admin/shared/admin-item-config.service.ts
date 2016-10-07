import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { DatabaseService } from '../../shared/database.service';

import { AIType } from './admin-item-config.types';
import { AdminItemConfig } from './admin-item-config.class';


const AIConfigList : AdminItemConfig[] = 
[
  new AdminItemConfig(AIType.Hangout,"sortie","une sortie", "de la sortie", "/hangouts", "sorties",false),
  new AdminItemConfig(AIType.News,"actualité","une actualité", "de l'actualité", "/news", "actus", false),
  new AdminItemConfig(AIType.Podcast,"podcast","un podcast", "du podcast", "/podcasts", "podcasts", false),
  new AdminItemConfig(AIType.Program,"émission","une émission", "de l'émission", "/programs", "emissions", true),
  new AdminItemConfig(AIType.Theme,"thème","un thème", "du thème", "/themes", "themes", true),
]

@Injectable()
export class AdminItemConfigService {

  constructor(private db : DatabaseService, 
              private router: Router) { }

  getConfigs()
  {
    return AIConfigList;
  }

  private getConfFromRouteValue(value : string) : AdminItemConfig
  {
    for(var config of AIConfigList)
    {
      if (config.route == value) return config;
    }
    return null;
  }

  getConfFromParams(params : Params) : AdminItemConfig
  {
    return this.getConfFromRouteValue(params['itemType']);
  }

  getConfFromSnapchot(route : ActivatedRouteSnapshot) : AdminItemConfig
  {
    return this.getConfFromParams(route.params);
  }

  getConfFromRoute(route : ActivatedRoute) : AdminItemConfig
  {
    return this.getConfFromSnapchot(route.snapshot);
  }

  checkConfFromParams(params : Params) : AdminItemConfig
  {
    let itemConfig = this.getConfFromParams(params);
    if (itemConfig == null) 
    {
      this.router.navigate(['admin']);
    }
    else
    {
      this.db.setItemConfig(itemConfig);
    } 
    return itemConfig;
  }

  checkConfFromSnapchot(route : ActivatedRouteSnapshot) : AdminItemConfig
  {
    return this.getConfFromParams(route.params);
  }

  checkConfFromRoute(route : ActivatedRoute) : AdminItemConfig
  {
    return this.checkConfFromSnapchot(route.snapshot);
  }
}
