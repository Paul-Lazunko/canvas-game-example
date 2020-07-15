import { Strategy } from '../strategy';
import { AWeapon } from './AWeapon';
import { IPosition, ISize } from '../interfaces';

export abstract class ADynamicItem {

  health: number;
  armor: number;
  speed: number;
  position: IPosition;
  size: ISize;
  weapons: AWeapon[];

  strategy?: Strategy;

  abstract render(ctx: any): void
  abstract die(ctx: any): void


}
