import { ADynamicItem, AWeapon } from '../abstract';
import { EWeapon, WEAPON_CANNON_FLASH_COLOR, WEAPON_CANNON_SHOT_COLOR } from '../constants';
import { IPosition, IRenderShotParams, ISize } from '../interfaces';

export class Cannon extends AWeapon {

  public name: string = EWeapon.CANNON;
  public distance: number = 600;
  public damage: number = 20;
  public damageSize: ISize = {
    width: 5,
    height: 5
  };
  public speed: number = 600;
  public fireRate: number = 1;
  public reload: number = 500;
  public shotColor: string = WEAPON_CANNON_SHOT_COLOR;
  public flashColor: string = WEAPON_CANNON_FLASH_COLOR;
  public ammoCount: number = 20;

  public renderShotMotion = (options: IRenderShotParams) => {
    const { ctx, position } = options;
    ctx.fillStyle = this.shotColor;
    ctx.fillRect(position.x-2, position.y-2, 5,5);
  }

  public renderShotMotionEnd = (ctx: any, position: IPosition) => {
    ctx.fillStyle = this.flashColor;
    ctx.fillRect(position.x - 4, position.y - 4, 9,9);
  }


}
