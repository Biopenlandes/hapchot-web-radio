import { ImageContentAdmnistrableItem } from '../shared/image-content-administrable-item';
import { AIType } from '../admin/shared/admin-item-config.module';

export class Presentation extends ImageContentAdmnistrableItem { 
  
  constructor(type) {
    super(type);
  }
}