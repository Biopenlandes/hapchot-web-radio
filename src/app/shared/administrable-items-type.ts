export enum AIType {
    Hangout = 0,
    News = 1
}

export class AdminItemConfig
{
  constructor(public text : string,
              public textSingulier : string,
              public textPluriel : string,
              public dbKey : string,
              public route : string) {
  }
}

export const AIConfigList = {
  0: new AdminItemConfig("sortie","une sortie", "des sorties", "/hangouts", "sorties"),
  1: new AdminItemConfig("actualité","une actu", "des actualités", "/news", "actus")
}

export function getAdminItemConfigFromRoute(route : string) : AdminItemConfig
{
  for(let i in AIConfigList)
  {
    if (AIConfigList[i].route == route) return AIConfigList[i];
  }
  return null;
}
