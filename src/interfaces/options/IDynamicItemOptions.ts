import { AWeapon } from '../../abstract';
import { IPosition } from '../contracts';

export interface IDynamicItemOptions {
  position: IPosition,
  weapons: AWeapon[]
}
