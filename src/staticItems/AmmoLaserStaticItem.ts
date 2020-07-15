import { AStaticItem } from '../abstract';
import { EStaticItems, EWeapon } from '../constants';
import { ISize, IStaticItemOptions } from '../interfaces';

export class AmmoLaserStaticItem extends AStaticItem {

  constructor(options: IStaticItemOptions) {
    super(options);
    this.type =  EStaticItems.AMMO_LASER;
    this.size = {
      width: 9,
      height: 9
    };
  }

  public render(ctx: any) {
    ctx.fillStyle = '#87ade1';
    ctx.fillRect(this.position.x, this.position.y, 9,9)
  }

}
