import { ADynamicItem, AWeapon } from '../../abstract';
import { IPosition } from '../contracts';

export interface IShotOptions {
  shooter: ADynamicItem,
  weapon: AWeapon,
  startPosition: IPosition
  endPosition: IPosition,
  damage: number,
  distance: number,
  speed: number
  renderShotMotion: (ctx: any, position: IPosition) => void,
  renderShotMotionEnd: (ctx: any, position: IPosition) => void,
}
