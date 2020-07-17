import { ADynamicItem } from '../abstract';
import { EOrientation } from '../constants';
import { IInputOptions, IPosition } from '../interfaces';

export class Input {
  public position: Partial<IPosition>;
  public target: ADynamicItem;
  public orientation: EOrientation;

  constructor(options: IInputOptions) {
    const { position, target } = options;
    this.position = position;
    this.target = target;
    this.orientation = position.x ? EOrientation.HORIZONTAL : EOrientation.VERTICAL
  }
}
