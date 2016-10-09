import { AIType } from '../admin/shared/admin-item-config.module';

export class AdmnistrableItem {  
  
  public ownerType : AIType;
  public ownerSlug : string;
  public slug : string; // uses as key id
  public title : string; // to show in manager list
  public index : number = null; // index in manager list

  constructor(public type : AIType) {}
}

