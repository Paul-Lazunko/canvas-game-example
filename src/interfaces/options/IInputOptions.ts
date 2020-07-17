import { ADynamicItem } from '../../abstract/ADynamicItem';
import { IPosition } from '../contracts/IPosition';

export interface IInputOptions {
  position: Partial<IPosition>,
  target: ADynamicItem
}
