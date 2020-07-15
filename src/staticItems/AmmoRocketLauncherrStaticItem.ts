import { AStaticItem } from '../abstract';
import { EStaticItems, EWeapon } from '../constants';
import { ISize, IStaticItemOptions } from '../interfaces';

export class AmmoRocketLauncherrStaticItem extends AStaticItem {

  constructor(options: IStaticItemOptions) {
    super(options);
    this.type =  EStaticItems.AMMO_ROCKET_LAUNCHER;
    this.size = {
      width: 9,
      height: 9
    };
  }

  public render(ctx: any) {
    ctx.fillStyle = '#4e525a';
    ctx.fillRect(this.position.x, this.position.y, 9,9)
    ctx.fillStyle = '#9cc0c5';
    ctx.fillRect(this.position.x + 3, this.position.y + 3, 3,3)
    ctx.fillRect(this.position.x + 3, this.position.y + 6, 3,3)
    ctx.fillRect(this.position.x, this.position.y + 6, 9,3)
  }

}
