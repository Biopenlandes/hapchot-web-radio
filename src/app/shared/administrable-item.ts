export class AdmnistrableItem {  
  
  public slug : string; // uses as key id
  public title : string; // to show in manager list
  public index : number = -1; // index in manager list

  constructor() {}

  getCoreValuesFrom(itemModel)
  {
    if (itemModel)
    {
      this.slug       = itemModel.slug;
      this.title      = itemModel.title;
      this.index      = itemModel.index;      
    }
    return this;
  }
}

