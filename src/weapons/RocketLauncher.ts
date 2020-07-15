import { ADynamicItem, AWeapon } from '../abstract';
import { EWeapon } from '../constants';
import { IPosition, IRenderShotOptions, ISize } from '../interfaces';

export class RocketLauncher extends AWeapon {

  public name: string = 'rocketLauncher';
  public distance: number = 600;
  public damage: number = 100;
  public damageSize: ISize = {
    width: 49,
    height: 49
  };
  public speed: number = 250;
  public fireRate: number = 1;
  public reload: number = 2000;
  public color: string = '#111';
  public shotColor: string = '#34468a';
  public flashColor: string = '#ffef00';
  public ammoCount: number = 15;

  public renderShotStart = (options: IRenderShotOptions) => {
    const { ctx, position, dx, dy } = options;
    const kx: number = dx === 0 ? 0 : dx > 0 ? 1 : -1;
    const ky: number = dy === 0 ? 0 : dy > 0 ? 1 : -1;
    ctx.fillSTyle = this.shotColor;
    for ( let i = -1; i < 2; i = i + 1 ) {
      for ( let j = -1; j < 2; j = j + 1 ) {
        if ( i === kx && j == ky ) {
          ctx.fillRect(position.x + kx , position.y + ky, 3, 3 );
          ctx.fillRect(position.x + kx*3 , position.y - ky*3, 3, 3 );
          ctx.fillRect(position.x - kx*3 , position.y + ky*3, 3, 3 );
          ctx.fillRect(position.x - (2 - Math.abs(kx + ky)) , position.y - (2 - Math.abs(kx + ky)), 3, 3 );
        }
      }
    }

  };

  public renderShotEnd = (ctx: any, position: IPosition) => {
    ctx.fillStyle = this.flashColor;
    ctx.fillRect(position.x - 24, position.y - 24, 49,49);
  }

}
