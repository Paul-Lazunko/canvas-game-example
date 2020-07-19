import { ADynamicItem, AWeapon } from '../abstract';
import { EWeapon, WEAPON_FLAMETHROWER_FLASH_COLOR, WEAPON_FLAMETHROWER_SHOT_COLOR } from '../constants';
import { IPosition, IRenderShotParams, ISize } from '../interfaces';

export class Flamethrower extends AWeapon {

  public name: string = EWeapon.FLAMETHROWER;
  public distance: number = 36;
  public damage: number = 100;
  public damageSize: ISize = {
    width: 25,
    height: 25
  };
  public speed: number = 200;
  public fireRate: number = 1;
  public reload: number = 1000;
  public shotColor: string = WEAPON_FLAMETHROWER_SHOT_COLOR;
  public flashColor: string = WEAPON_FLAMETHROWER_FLASH_COLOR;
  public ammoCount: number = 10;

  public renderShotMotion = (options: IRenderShotParams) => {
    const { ctx, position, dx, dy } = options;
    const kx: number = Math.abs(dx) < 5 ? 0 : dx > 0 ? 1 : -1;
    const ky: number = Math.abs(dy) < 5 ? 0 : dy > 0 ? 1 : -1;
    ctx.fillStyle = '#ffe700';
    ctx.fillRect(position.x + 8*kx, position.y + 8*ky, 9,9);
    ctx.fillRect(position.x + 10*kx, position.y + 10*ky, 7,7);
    ctx.fillStyle = '#ff6000';
    ctx.fillRect(position.x + 4*kx, position.y + 4*ky, 7,7);
    ctx.fillRect(position.x + 6*kx, position.y + 6*ky, 9,9);
    ctx.fillStyle = this.shotColor;
    ctx.fillRect(position.x, position.y, 3,3);
    ctx.fillRect(position.x + 2 * kx, position.y + 2 * ky, 5,5);
  };

  public renderShotMotionEnd = (ctx: any, position: IPosition) => {
    ctx.fillStyle = '#ffef00';
    ctx.fillRect(position.x - 12, position.y - 12, 25,25);
    ctx.fillStyle = '#ffd919';
    ctx.fillRect(position.x - 8, position.y - 8, 17,17);
    ctx.fillStyle = '#ff8831';
    ctx.fillRect(position.x - 6, position.y - 6, 13,13);
  }


}
