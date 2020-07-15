import { IPosition } from './IPosition';

export interface IRenderShotOptions {
  ctx: any,
  position: IPosition,
  dx?: number,
  dy?: number,
  endPosition?: IPosition
}
