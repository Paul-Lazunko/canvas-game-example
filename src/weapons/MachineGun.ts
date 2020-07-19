import { ADynamicItem, AWeapon } from '../abstract';
import { EWeapon, WEAPON_MACHINE_GUN_FLASH_COLOR, WEAPON_MACHINE_GUN_SHOT_COLOR } from '../constants';
import { IPosition, IRenderShotParams, ISize } from '../interfaces';

export class MachineGun extends AWeapon {

  public name = EWeapon.MACHINE_GUN;
  public distance: number = 500;
  public damage: number = 2;
  public damageSize: ISize = {
    width: 3,
    height: 3
  };
  public speed: number = 650;
  public fireRate: number = 10;
  public reload: number = 100;
  public shotColor: string = WEAPON_MACHINE_GUN_SHOT_COLOR;
  public flashColor: string = WEAPON_MACHINE_GUN_FLASH_COLOR;
  public ammoCount: number = 200;

  public renderShotMotion = (options: IRenderShotParams) => {
    const { ctx, position } = options;
    ctx.fillStyle = this.shotColor;
    ctx.fillRect(position.x, position.y, 2,2);
  };

  public renderShotMotionEnd = (ctx: any, position: IPosition) => {
    ctx.fillStyle = this.flashColor;
    ctx.fillRect(position.x - 1, position.y - 1, 3,3);
  }


}
