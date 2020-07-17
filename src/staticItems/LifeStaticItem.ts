import { AStaticItem } from '../abstract';
import { ISize, IStaticItemOptions } from '../interfaces';
import {
  EStaticItems,
  LIFE_STATIC_ITEM_COLOR_FIRST,
  LIFE_STATIC_ITEM_COLOR_SECOND
} from '../constants';

export class LifeStaticItem extends AStaticItem {

  public value: number = 100;

  constructor(options: IStaticItemOptions) {
    super(options);
    this.type =  EStaticItems.LIFE;
    this.size = {
      width: 9,
      height: 9
    };
  }

  public render(ctx: any) {
    ctx.fillStyle = LIFE_STATIC_ITEM_COLOR_FIRST;
    ctx.fillRect(this.position.x, this.position.y, 9,9)
    ctx.fillStyle = LIFE_STATIC_ITEM_COLOR_SECOND;
    ctx.fillRect(this.position.x + 3, this.position.y, 3,3)
    ctx.fillRect(this.position.x, this.position.y + 3, 3,3)
    ctx.fillRect(this.position.x + 3, this.position.y + 3, 3,3)
    ctx.fillRect(this.position.x + 6, this.position.y + 3, 3,3)
    ctx.fillRect(this.position.x + 3, this.position.y + 6, 3,3)
  }

}
