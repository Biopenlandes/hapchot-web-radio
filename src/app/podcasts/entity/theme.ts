import { AdmnistrableItem } from '../../shared/administrable-item';
import { Program } from './program';

export class Theme extends AdmnistrableItem { 
  
  public programs : Program[];

  constructor() {
    super();
  }
}

