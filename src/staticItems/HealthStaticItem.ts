import { AStaticItem } from '../abstract';
import { EStaticItems, EWeapon } from '../constants';
import { ISize, IStaticItemOptions } from '../interfaces';

export class HealthStaticItem extends AStaticItem {

  constructor(options: IStaticItemOptions) {
    super(options);
    this.type =  EStaticItems.HEALTH;
    this.size = {
      width: 9,
      height: 9
    };
  }

  public size: ISize = {
    width: 9,
    height: 9
  };

  public render(ctx: any) {
    ctx.fillStyle = '#eee';
    ctx.fillRect(this.position.x, this.position.y, 9,9)
    ctx.fillStyle = '#d00';
    ctx.fillRect(this.position.x + 3, this.position.y, 3,3)
    ctx.fillRect(this.position.x, this.position.y + 3, 3,3)
    ctx.fillRect(this.position.x + 3, this.position.y + 3, 3,3)
    ctx.fillRect(this.position.x + 6, this.position.y + 3, 3,3)
    ctx.fillRect(this.position.x + 3, this.position.y + 6, 3,3)
  }

}
