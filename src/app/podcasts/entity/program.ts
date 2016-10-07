import { ImageContentAdmnistrableItem } from '../../shared/image-content-administrable-item';
import { Podcast } from './podcast';

export class Program extends ImageContentAdmnistrableItem { 
  
  public subtitle : string;
  public broadcasting : string;
  public podcasts : Podcast[];

  constructor() {
    super();
  }
}

