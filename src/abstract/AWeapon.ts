import { TANK_COLOR_THIRD } from '../constants';
import { ADynamicItem } from './ADynamicItem';
import {
  IPosition,
  IRenderShotParams,
  ISize
} from '../interfaces';

export abstract class AWeapon {
  public name: string;
  public damage: number;
  public damageSize: ISize;
  public speed: number;
  public fireRate: number;
  public reload: number;
  public distance: number;
  public isActive: boolean = true;
  public color: string = TANK_COLOR_THIRD;
  public ammoCount: number;
  public position: IPosition;

  public get _isActive() {
    return this.isActive;
  }

  public render(ctx: any, shooter: ADynamicItem, mousePosition: IPosition) {
    ctx.fillStyle = this.color;

    let kx, ky;
    if (Math.abs(mousePosition.x - shooter.position.x) <= shooter.size.width) {
      kx = 0;
    } else {
      kx = mousePosition.x - shooter.position.x > 0 ? 1 : -1
    }

    if (Math.abs(mousePosition.y - shooter.position.y) <= shooter.size.height) {
      ky = 0;
    } else {
      ky = mousePosition.y - shooter.position.y > 0 ? 1 : -1
    }

    for (let i = 0; i < 10 - Math.abs(kx) - Math.abs(ky); i++) {
      ctx.fillStyle = this.color;
      this.position = {
        x: shooter.position.x + 6 + kx * i,
        y: shooter.position.y + 6 + ky * i
      };
      ctx.fillRect(
        Math.round(shooter.position.x + 6 + kx * i ),
        Math.round(shooter.position.y + 6 + ky * i ),
        2,
        2,
      );
    }
  }

  abstract renderShotMotion: (options: IRenderShotParams) => void;
  abstract renderShotMotionEnd: (ctx: any, position: IPosition) => void;

}
