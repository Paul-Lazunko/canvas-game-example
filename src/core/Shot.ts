import { ADynamicItem, AWeapon } from '../abstract';
import { IPosition, IRenderShot, IRenderShotParams, IShotOptions, ISize } from '../interfaces';

export class Shot implements IRenderShot{

  public shooter: ADynamicItem;
  public weapon: AWeapon;

  public startPosition: IPosition;
  public endPosition: IPosition;
  public dynamicPosition: IPosition;

  public damage: number;
  public speed: number;
  public distance: number;

  public isHit: boolean;

  constructor(options: IShotOptions) {
    const {
      shooter,
      weapon,
      startPosition,
      endPosition,
      damage,
      distance,
      speed,
      renderShotMotion,
      renderShotMotionEnd
    } = options;
    this.shooter = shooter;
    this.weapon = weapon;
    this.startPosition = Object.assign({}, startPosition);
    this.dynamicPosition = startPosition;
    this.endPosition = endPosition;
    this.damage = damage;
    this.distance = distance;
    this.speed = speed;
    this.renderShotMotion = renderShotMotion.bind(weapon);
    this.renderShotMotionEnd = renderShotMotionEnd.bind(weapon);
    this.isHit = false;
  }

  renderShotMotion(options: IRenderShotParams): void {
  }

  renderShotMotionEnd(ctx: any, position: IPosition): void {
  }
}
