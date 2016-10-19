import { ImageContentAdmnistrableItem } from '../../shared/image-content-administrable-item';
import { AIType } from '../../admin/shared/admin-item-config.module';

export class Hangout extends ImageContentAdmnistrableItem { 
  
  public place : string;
  public date : Date;
  public dateTimestamp : number;

  constructor() {
    super(AIType.Hangout);
  }
}
