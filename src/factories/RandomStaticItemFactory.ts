import {
  EStaticItems
} from '../constants';
import { IStaticItemOptions } from '../interfaces';
import {
  HealthStaticItem,
  LifeStaticItem,
  MineStaticItem,
  AmmoCannonStaticItem,
  AmmoMachineGunStaticItem,
  AmmoFlamethrowerStaticItem,
  AmmoLaserStaticItem,
  AmmoRocketLauncherStaticItem
} from '../staticItems'

const items: string[] = Object.values(EStaticItems);

export class RandomStaticItemFactory {
  public static getRandomStaticItem(options: IStaticItemOptions) {
    const item = items[ Math.round(Math.random() * (items.length - 1))];
    switch (item) {
      case EStaticItems.HEALTH:
        return new HealthStaticItem(options);
        break;
      case EStaticItems.LIFE:
        return new LifeStaticItem(options);
        break;
      case EStaticItems.MINE:
        return new MineStaticItem(options);
        break;
      case EStaticItems.AMMO_FLAMETHROWER:
        return new AmmoFlamethrowerStaticItem(options);
        break;
      case EStaticItems.AMMO_CANNON:
        return new AmmoCannonStaticItem(options);
        break;
      case EStaticItems.AMMO_MACHINE_GUN:
        return new AmmoMachineGunStaticItem(options);
        break;
      case EStaticItems.AMMO_LASER:
        return new AmmoLaserStaticItem(options);
        break;
        case EStaticItems.AMMO_ROCKET_LAUNCHER:
        return new AmmoRocketLauncherStaticItem(options);
        break;
    }
  }
}
