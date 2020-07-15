import { ADynamicItem } from '../abstract/ADynamicItem';
import { IPosition } from './IPosition';

export interface IInputOptions {
  position: Partial<IPosition>,
  target: ADynamicItem
}
