import { AWeapon } from '../abstract';
import { IPosition } from './IPosition';

export interface IDynamicItemOptions {
  position: IPosition,
  weapons: AWeapon[]
}
