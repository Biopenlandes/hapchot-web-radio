const uploadDir = "assets/uploads/";

export class Picture
{
  public thumbnail : string;
  public medium : string;
  public large : string;

  constructor(public pictureName : string) 
  {
    this.thumbnail = this.getPath('small');
    this.medium = this.getPath('medium');
    this.large = this.getPath('large');
  }

  private getPath(type : string)
  {
    return uploadDir + type + '/' + this.pictureName;
  }
}