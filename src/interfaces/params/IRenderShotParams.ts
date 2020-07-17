import { IPosition } from '../contracts';

export interface IRenderShotParams {
  ctx: any,
  position: IPosition,
  dx?: number,
  dy?: number,
  endPosition?: IPosition
  startPosition?: IPosition
}
