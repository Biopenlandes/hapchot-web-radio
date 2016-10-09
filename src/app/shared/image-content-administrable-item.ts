import { AdmnistrableItem } from './administrable-item';
import { AIType } from '../admin/shared/admin-item-config.module';

export class ImageContentAdmnistrableItem extends AdmnistrableItem { 
  
  public content : string;
  public pictureUrl : string; 

  constructor(type : AIType) {
    super(type);
  }
}

