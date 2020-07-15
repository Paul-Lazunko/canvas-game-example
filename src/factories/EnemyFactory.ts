import { AWeapon } from '../abstract';
import { Tank } from '../dynamicItems';
import { IPosition } from '../interfaces';
import { RandomWeaponFactory } from './RandomWeaponFactory';

export class EnemyFactory {
  static addEnemy(position: IPosition) {
    const weapon: AWeapon = RandomWeaponFactory.getRandomWeapon();
    return new Tank({
      position,
      weapons: [
        weapon
      ]
    });
  }
}
