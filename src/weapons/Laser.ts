import { ADynamicItem, AWeapon } from '../abstract';
import { EWeapon } from '../constants';
import { IPosition, IRenderShotOptions, ISize } from '../interfaces';

export class Laser extends AWeapon {

  public name: string = 'laser';
  public distance: number = 1000;
  public damage: number = 100;
  public damageSize: ISize = {
    width: 5,
    height: 5
  };
  public speed: number = 1000;
  public fireRate: number = 1;
  public reload: number = 5000;
  public color: string = '#111';
  public shotColor: string = '#b3e0ff';
  public flashColor: string = '#ffef00';
  public ammoCount: number = 5;

  public renderShotStart = (options: IRenderShotOptions) => {
    const { ctx, position, endPosition, dx, dy } = options;
    console.log({  position, endPosition});
    ctx.strokeStyle = this.shotColor;
    ctx.strokeWidth = '3px';
    ctx.beginPath();
    ctx.moveTo(endPosition.x, endPosition.y);
    ctx.lineTo(position.x, position.y);
    ctx.stroke();
    ctx.closePath();
  };

  public renderShotEnd = (ctx: any, position: IPosition) => {
    ctx.fillStyle = this.flashColor;
    ctx.fillRect(position.x - 4, position.y - 4, 9,9);
  }


}
