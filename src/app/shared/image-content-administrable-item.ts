import { AdmnistrableItem } from './administrable-item';
import { AIType } from '../admin/shared/admin-item-config.module';
import { Picture } from './picture.class';

export class ImageContentAdmnistrableItem extends AdmnistrableItem { 
  
  public content : string;
  public picture : Picture; 

  constructor(type : AIType) {
    super(type);
  }
}

