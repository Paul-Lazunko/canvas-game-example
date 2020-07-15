import { ADynamicItem, AWeapon } from '../abstract';
import { IPosition } from './IPosition';

export interface IShotOptions {
  shooter: ADynamicItem,
  weapon: AWeapon,
  startPosition: IPosition
  endPosition: IPosition,
  damage: number,
  distance: number,
  speed: number
  renderStart: (ctx: any, position: IPosition) => void,
  renderEnd: (ctx: any, position: IPosition) => void,
}
