import { AStaticItem } from '../abstract';
import { IStaticItemOptions } from '../interfaces';
import {
  EStaticItems,
  WEAPON_CANNON_AMMO_COLOR_FIRST,
  WEAPON_CANNON_AMMO_COLOR_SECOND
} from '../constants';

export class AmmoCannonStaticItem extends AStaticItem {

  public value: number = 10;

  constructor(options: IStaticItemOptions) {
    super(options);
    this.type =  EStaticItems.AMMO_CANNON;
    this.size = {
      width: 9,
      height: 9
    };
  }


  public render(ctx: any) {
    ctx.fillStyle = WEAPON_CANNON_AMMO_COLOR_FIRST;
    ctx.fillRect(this.position.x, this.position.y, 9,9)
    ctx.fillStyle = WEAPON_CANNON_AMMO_COLOR_SECOND;
    ctx.fillRect(this.position.x, this.position.y, 9,3)
    ctx.fillRect(this.position.x + 6, this.position.y, 3,3)
    ctx.fillRect(this.position.x, this.position.y + 3, 3,3)
    ctx.fillRect(this.position.x+6, this.position.y + 3, 3,3)
    ctx.fillRect(this.position.x, this.position.y + 6, 9,3)

  }

}
