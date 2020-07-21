import { ADynamicItem, AWeapon } from '../abstract';
import { EWeapon, WEAPON_ROCKET_LAUNCHER_COLOR, WEAPON_ROCKET_LAUNCHER_FLASH_COLOR } from '../constants';
import { IPosition, IRenderShotParams, ISize } from '../interfaces';

export class RocketLauncher extends AWeapon {

  public name: string = 'rocketLauncher';
  public distance: number = 600;
  public damage: number = 100;
  public damageSize: ISize = {
    width: 6,
    height: 6
  };
  public speed: number = 300;
  public fireRate: number = 1;
  public reload: number = 1500;
  public shotColor: string = WEAPON_ROCKET_LAUNCHER_COLOR;
  public flashColor: string = WEAPON_ROCKET_LAUNCHER_FLASH_COLOR;
  public ammoCount: number = 15;

  public renderShotMotion = (options: IRenderShotParams) => {
    const { ctx, position, dx, dy } = options;
    const kx: number = Math.abs(dx) < 5 ? 0 : dx > 0 ? 1 : -1;
    const ky: number = Math.abs(dy) < 5 ? 0 : dy > 0 ? 1 : -1;
    ctx.fillStyle = this.flashColor;
    ctx.fillRect(position.x - 3 , position.y - 3, 9, 9 );
    ctx.fillStyle = this.shotColor;
    ctx.fillRect(position.x + kx*3 , position.y + ky*3, 3, 3 );
    ctx.fillRect(position.x + kx*6 , position.y + ky*6, 3, 3 );
  };

  public renderShotMotionEnd = (ctx: any, position: IPosition) => {
    ctx.fillStyle = this.flashColor;
    ctx.fillRect(position.x - 24, position.y - 24, 49,49);
  }

}
