import { AStaticItem } from '../abstract';
import { EStaticItems, EWeapon } from '../constants';
import { ISize, IStaticItemOptions } from '../interfaces';

export class AmmoMachineGunStaticItem extends AStaticItem {

  constructor(options: IStaticItemOptions) {
    super(options);
    this.type =  EStaticItems.AMMO_MACHINE_GUN;
    this.size = {
      width: 9,
      height: 9
    };
  }

  public render(ctx: any) {
    ctx.fillStyle = '#98ac5b';
    ctx.fillRect(this.position.x, this.position.y, 9,9)
    ctx.fillStyle = '#505a26';
    ctx.fillRect(this.position.x, this.position.y, 3,3)
    ctx.fillRect(this.position.x + 6, this.position.y, 3,3)
    ctx.fillRect(this.position.x + 3, this.position.y + 3, 3,3)
    ctx.fillRect(this.position.x, this.position.y + 6, 3,3)
    ctx.fillRect(this.position.x + 6, this.position.y + 6, 3,3)

  }

}
