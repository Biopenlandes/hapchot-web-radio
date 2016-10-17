import { AdmnistrableItem } from '../../shared/administrable-item';
import { AIType } from '../../admin/shared/admin-item-config.module';

export class Podcast extends AdmnistrableItem { 

  public key : string;
  public description : string;
  public pictures : any;
  public audioLength : number;
  public url : string;
  public updatedTime : Date;
  public createdTime : Date;
  
  constructor() {
    super(AIType.Podcast);
  }  
}
