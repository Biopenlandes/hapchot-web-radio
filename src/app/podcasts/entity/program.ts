import { ImageContentAdmnistrableItem } from '../../shared/image-content-administrable-item';
import { Podcast } from './podcast';
import { AIType } from '../../admin/shared/admin-item-config.module';

export class Program extends ImageContentAdmnistrableItem { 
  
  public subtitle : string;
  public broadcasting : string;
  public podcasts : Podcast[];
  public backgroundColor : string;

  constructor() {
    super(AIType.Program);
  }
}

