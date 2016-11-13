import { environment } from '../../environments/environment';

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
    return environment.uploadDir + type + '/' + this.pictureName;
  }
}