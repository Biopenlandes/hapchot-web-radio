import { AdmnistrableItem } from '../../shared/administrable-item';

export class Hangout extends AdmnistrableItem { 
  
  public pictureUrl : string;
  public content : string;

  constructor() {
    super();
  }

  getValuesFrom(hangoutModel)
  {
    super.getCoreValuesFrom(hangoutModel);
    if (hangoutModel)
    {
      this.pictureUrl = hangoutModel.pictureUrl;
      this.content    = hangoutModel.content;      
    }
    return this;
  }
}
