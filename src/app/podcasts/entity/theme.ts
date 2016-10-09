import { AdmnistrableItem } from '../../shared/administrable-item';
import { Program } from './program';
import { AIType } from '../../admin/shared/admin-item-config.module';

export class Theme extends AdmnistrableItem { 
  
  public programs : Program[];

  constructor() {
    super(AIType.Theme);
  }
}

