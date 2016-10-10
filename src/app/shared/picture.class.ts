const uploadDir = "assets/uploads/";

export class Picture
{
  public smallPath : string;
  public mediumPath : string;
  public largePath : string;

  constructor(public pictureName : string) 
  {
    this.smallPath = this.getPath('small');
    this.mediumPath = this.getPath('medium');
    this.largePath = this.getPath('large');
  }

  private getPath(type : string)
  {
    return uploadDir + type + '/' + this.pictureName;
  }
}