import { AStaticItem } from '../abstract';
import { IStaticItemOptions } from '../interfaces';
import {
  EStaticItems,
  WEAPON__ROCKET_LAUNCHER_AMMO_COLOR_FIRST,
  WEAPON__ROCKET_LAUNCHER_AMMO_COLOR_SECOND
} from '../constants';

export class AmmoRocketLauncherStaticItem extends AStaticItem {

  public value: number = 5;

  constructor(options: IStaticItemOptions) {
    super(options);
    this.type =  EStaticItems.AMMO_ROCKET_LAUNCHER;
    this.size = {
      width: 9,
      height: 9
    };
  }

  public render(ctx: any) {
    ctx.fillStyle = WEAPON__ROCKET_LAUNCHER_AMMO_COLOR_FIRST;
    ctx.fillRect(this.position.x, this.position.y, 9,9)
    ctx.fillStyle = WEAPON__ROCKET_LAUNCHER_AMMO_COLOR_SECOND;
    ctx.fillRect(this.position.x + 3, this.position.y + 3, 3,3)
    ctx.fillRect(this.position.x + 3, this.position.y + 6, 3,3)
    ctx.fillRect(this.position.x, this.position.y + 6, 9,3)
  }

}
