import { ADynamicItem, AWeapon } from '../abstract';
import { EWeapon, WEAPON_LASER_FLASH_COLOR, WEAPON_LASER_SHOT_COLOR } from '../constants';
import { IPosition, IRenderShotParams, ISize } from '../interfaces';

export class Laser extends AWeapon {

  public name: string = 'laser';
  public distance: number = 300;
  public damage: number = 100;
  public damageSize: ISize = {
    width: 5,
    height: 5
  };
  public speed: number = 1200;
  public fireRate: number = 1;
  public reload: number = 2000;
  public shotColor: string = WEAPON_LASER_SHOT_COLOR;
  public flashColor: string = WEAPON_LASER_FLASH_COLOR;
  public ammoCount: number = 5;

  public renderShotMotion = (options: IRenderShotParams) => {
    const { ctx, position, endPosition, startPosition } = options;
    ctx.strokeStyle = this.shotColor;
    ctx.strokeWidth = '3px';
    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
    ctx.lineTo(startPosition.x, startPosition.y);
    ctx.stroke();
    ctx.closePath();
  };

  public renderShotMotionEnd = (ctx: any, position: IPosition) => {
    ctx.fillStyle = this.flashColor;
    ctx.fillRect(position.x - 4, position.y - 4, 9,9);
  }


}
