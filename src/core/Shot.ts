import { ADynamicItem, AWeapon } from '../abstract';
import { IPosition, IRenderShotOptions, IShotOptions } from '../interfaces';

export class Shot {

  public shooter: ADynamicItem;

  public startPosition: IPosition;
  public endPosition: IPosition;
  public dynamicPosition: IPosition;

  public damage: number;
  public speed: number;
  public distance: number;

  isHit: boolean;

  public renderStart: (options: IRenderShotOptions) => void;
  public renderEnd: (ctx: any, position: IPosition) => void;

  constructor(options: IShotOptions) {
    const {
      shooter,
      weapon,
      startPosition,
      endPosition,
      damage,
      distance,
      speed,
      renderEnd,
      renderStart
    } = options;
    this.shooter = shooter;
    this.startPosition = Object.assign({}, startPosition);
    this.dynamicPosition = startPosition;
    this.endPosition = endPosition;
    this.damage = damage;
    this.distance = distance;
    this.speed = speed;
    this.renderStart = renderStart.bind(weapon);
    this.renderEnd = renderEnd.bind(weapon);
    this.isHit = false;
  }

}
