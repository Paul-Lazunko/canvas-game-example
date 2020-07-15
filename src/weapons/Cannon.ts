import { ADynamicItem, AWeapon } from '../abstract';
import { EWeapon } from '../constants';
import { IPosition, IRenderShotOptions, ISize } from '../interfaces';

export class Cannon extends AWeapon {

  public name: string = EWeapon.CANNON;
  public distance: number = 400;
  public damage: number = 25;
  public damageSize: ISize = {
    width: 9,
    height: 9
  };
  public speed: number = 400;
  public fireRate: number = 1;
  public reload: number = 500;
  public color: string = '#111';
  public shotColor: string = '#3c494a';
  public flashColor: string = '#fff600';
  public ammoCount: number = 20;

  public renderShotStart = (options: IRenderShotOptions) => {
    const { ctx, position } = options;
    ctx.fillStyle = this.shotColor;
    ctx.fillRect(position.x-2, position.y-2, 5,5);
  }

  public renderShotEnd = (ctx: any, position: IPosition) => {
    ctx.fillStyle = this.flashColor;
    ctx.fillRect(position.x - 4, position.y - 4, 9,9);
  }


}
