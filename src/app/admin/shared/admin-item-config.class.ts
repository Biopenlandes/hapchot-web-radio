import { AIType } from './admin-item-config.types';

export class AdminItemConfig
{
  constructor(public type: AIType,
              public text : string,
              public textArticleIndefini : string,
              public textArticleDefini : string,
              public textArticleDu : string,
              public route : string,
              public orderAsc : boolean,
              public showEditInSameWindow : boolean,
              public ownerType?: AIType) {
  }
}
