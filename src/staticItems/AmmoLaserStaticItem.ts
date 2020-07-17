import { AStaticItem } from '../abstract';
import { IStaticItemOptions } from '../interfaces';
import {
  EStaticItems,
  WEAPON_LASER_AMMO_COLOR_FIRST
} from '../constants';

export class AmmoLaserStaticItem extends AStaticItem {

  public value: number = 1;

  constructor(options: IStaticItemOptions) {
    super(options);
    this.type =  EStaticItems.AMMO_LASER;
    this.size = {
      width: 9,
      height: 9
    };
  }

  public render(ctx: any) {
    ctx.fillStyle = WEAPON_LASER_AMMO_COLOR_FIRST;
    ctx.fillRect(this.position.x, this.position.y, 9,9)
  }

}
