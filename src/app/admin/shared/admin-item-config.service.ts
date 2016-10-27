import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { DatabaseService } from '../../shared/database.service';

import { AIType } from './admin-item-config.types';
import { AdminItemConfig } from './admin-item-config.class';
import 'rxjs/add/operator/share';


const AIConfigList : AdminItemConfig[] = 
[
  new AdminItemConfig(AIType.Hangout,"sortie"    ,"une sortie"      , "la sortie"  ,"de la sortie"    , "sorties",false, false),
  new AdminItemConfig(AIType.News   ,"actualité"  ,"une actualité"   ,"l'actualité", "de l'actualité"  , "actus", false, false),
  new AdminItemConfig(AIType.Podcast,"podcast"    ,"un podcast"    ,"le podcast"    , "du podcast"    , "podcasts", false, false, AIType.Program),
  new AdminItemConfig(AIType.Program,"émission"  ,"une émission"    ,"l'émission"  , "de l'émission"  , "emissions", true, false, AIType.Theme),
  new AdminItemConfig(AIType.Theme  ,"thème"    ,"un thème"        , "le thème"  , "de la sortie"      , "themes", true, true),
  new AdminItemConfig(AIType.Presentation  ,"présentation"    ,"la présentation"        , "la présentation"  , "de la présentation" , "info/le-projet", true, true),
  new AdminItemConfig(AIType.Friends  ,"partenaires"    ,"les partenaires"        , "les partenaires"  , "des partenaires" , "info/amis-et-partenaires", true, true),
]

@Injectable()
export class AdminItemConfigService {

  constructor(private db : DatabaseService, 
              private router: Router) { }

  getConfigs()
  {
    return AIConfigList;
  }

  getConfFromType(type : number) : AdminItemConfig
  {
    for(var config of AIConfigList)
    {
      if (config.type == type) return config;
    }
    return null;
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

  checkConfFromSnapchot(route : ActivatedRouteSnapshot) : AdminItemConfig
  {
    return this.getConfFromParams(route.params);
  }

  checkConfFromRoute(route : ActivatedRoute) : AdminItemConfig
  {
    return this.checkConfFromSnapchot(route.snapshot);
  }
}
