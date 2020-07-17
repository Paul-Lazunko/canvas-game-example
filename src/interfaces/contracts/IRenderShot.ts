import { IPosition } from './IPosition';
import { IRenderShotParams } from '../params';

export interface IRenderShot {

  renderShotMotion (options: IRenderShotParams): void;
  renderShotMotionEnd (ctx: any, position: IPosition): void;
}
