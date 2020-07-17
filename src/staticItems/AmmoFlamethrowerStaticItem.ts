import { AStaticItem } from '../abstract';
import { IStaticItemOptions } from '../interfaces';
import {
  EStaticItems,
  WEAPON_FLAMETHROWER_AMMO_COLOR_FIRST
} from '../constants';

export class AmmoFlamethrowerStaticItem extends AStaticItem {

  public value: number = 5;

  constructor(options: IStaticItemOptions) {
    super(options);
    this.type =  EStaticItems.AMMO_FLAMETHROWER;
    this.size = {
      width: 9,
      height: 9
    };
  }

  public render(ctx: any) {
    ctx.fillStyle = WEAPON_FLAMETHROWER_AMMO_COLOR_FIRST;
    ctx.fillRect(this.position.x, this.position.y, 9,9);
  }

}
