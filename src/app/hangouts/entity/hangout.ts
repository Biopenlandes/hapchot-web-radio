export class Hangout {
  
  public title : string;
  public index : number; // index dans la liste des hangouts
  public pictureUrl : string;
  public content : string;
  public slug : string; // uses as key id

  constructor() {}

  getValuesFrom(hangoutModel)
  {
    if (hangoutModel)
    {
      this.title      = hangoutModel.title;
      this.index      = hangoutModel.index;
      this.pictureUrl = hangoutModel.pictureUrl;
      this.content    = hangoutModel.content;
      this.slug       = hangoutModel.slug;
    }
    return this;
  }
}
