import { AStaticItem } from '../abstract';
import { EStaticItems, EWeapon, HEALTH_STATIC_ITEM_COLOR_FIRST, HEALTH_STATIC_ITEM_COLOR_SECOND } from '../constants';
import { ISize, IStaticItemOptions } from '../interfaces';

export class HealthStaticItem extends AStaticItem {

  public value: number = 25;

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
    ctx.fillStyle = HEALTH_STATIC_ITEM_COLOR_FIRST;
    ctx.fillRect(this.position.x, this.position.y, 9,9)
    ctx.fillStyle = HEALTH_STATIC_ITEM_COLOR_SECOND;
    ctx.fillRect(this.position.x + 3, this.position.y, 3,3)
    ctx.fillRect(this.position.x, this.position.y + 3, 3,3)
    ctx.fillRect(this.position.x + 3, this.position.y + 3, 3,3)
    ctx.fillRect(this.position.x + 6, this.position.y + 3, 3,3)
    ctx.fillRect(this.position.x + 3, this.position.y + 6, 3,3)
  }

}
