import { AdmnistrableItem } from '../../shared/administrable-item';
import { AIType } from '../../admin/shared/admin-item-config.module';

export class Podcast extends AdmnistrableItem { 

  public description : string;
  public image : string;
  
  constructor() {
    super(AIType.Podcast);
  }
}
