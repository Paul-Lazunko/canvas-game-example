import { ADynamicItem, AWeapon } from '../abstract';
import { EWeapon } from '../constants';
import { IPosition, IRenderShotOptions, ISize } from '../interfaces';

export class MachineGun extends AWeapon {

  public name = EWeapon.MACHINE_GUN;
  public distance: number = 400;
  public damage: number = 2;
  public damageSize: ISize = {
    width: 3,
    height: 3
  };
  public speed: number = 600;
  public fireRate: number = 5;
  public reload: number = 100;
  public shotColor: string = '#9b390c';
  public flashColor: string = '#ffff00';
  public ammoCount: number = 200;

  public renderShotStart = (options: IRenderShotOptions) => {
    const { ctx, position } = options;
    ctx.fillStyle = this.shotColor;
    ctx.fillRect(position.x -1, position.y -1, 3,3);
  }

  public renderShotEnd = (ctx: any, position: IPosition) => {
    ctx.fillStyle = this.flashColor;
    ctx.fillRect(position.x - 2, position.y - 2, 5,5);
  }


}
