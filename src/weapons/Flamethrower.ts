import { ADynamicItem, AWeapon } from '../abstract';
import { EWeapon } from '../constants';
import { IPosition, IRenderShotOptions, ISize } from '../interfaces';

export class Flamethrower extends AWeapon {

  public name: string = EWeapon.FLAMETHROWER;
  public distance: number = 36;
  public damage: number = 100;
  public damageSize: ISize = {
    width: 25,
    height: 25
  };
  public speed: number = 100;
  public fireRate: number = 1;
  public reload: number = 500;
  public color: string = '#111';
  public shotColor: string = '#ff0c07';
  public flashColor: string = '#ff6000';
  public ammoCount: number = 10;

  public renderShotStart = (options: IRenderShotOptions) => {
    const { ctx, position, dx, dy } = options;
    const kx: number = dx === 0 ? 0 : dx > 0 ? 1 : -1;
    const ky: number = dy === 0 ? 0 : dy > 0 ? 1 : -1;
    ctx.fillStyle = '#ffe700';
    ctx.fillRect(position.x + 8*kx, position.y + 8*ky, 9,9);
    ctx.fillRect(position.x + 10*kx, position.y + 10*ky, 9,9);
    ctx.fillStyle = '#ff6000';
    ctx.fillRect(position.x - 4*kx, position.y - 4*ky, 9,9);
    ctx.fillRect(position.x + 4*kx, position.y + 4*ky, 9,9);
    ctx.fillStyle = this.shotColor;
    ctx.fillRect(position.x, position.y, 9,9);
  };

  public renderShotEnd = (ctx: any, position: IPosition) => {
    ctx.fillStyle = '#ffef00';
    ctx.fillRect(position.x - 12, position.y - 12, 25,25);
    ctx.fillStyle = '#ffd919';
    ctx.fillRect(position.x - 8, position.y - 8, 17,17);
    ctx.fillStyle = '#ff8831';
    ctx.fillRect(position.x - 6, position.y - 6, 13,13);
  }


}
