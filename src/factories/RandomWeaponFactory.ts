import { EWeapon } from '../constants';
import {
  Cannon,
  MachineGun,
  Flamethrower,
  Laser,
  RocketLauncher
} from '../weapons';

const items: string[] = Object.values(EWeapon);

export class RandomWeaponFactory {
  public static getRandomWeapon() {
    const item = items[ Math.round(Math.random() * (items.length - 1))];
    switch (item) {
      case EWeapon.FLAMETHROWER:
        return new Flamethrower();
        break;
      case EWeapon.CANNON:
        return  new Cannon();
        break;
      case EWeapon.MACHINE_GUN:
        return new MachineGun();
        break;
      case EWeapon.LASER:
        return new Laser();
        break;
      case EWeapon.ROCKET_LAUNCHER:
        return new RocketLauncher();
        break;
    }
  }
}
