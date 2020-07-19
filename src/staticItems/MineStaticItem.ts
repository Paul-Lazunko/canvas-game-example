import { AStaticItem } from '../abstract';
import { EStaticItems, EWeapon, MINE_STATIC_ITEM_COLOR_FIRST } from '../constants';
import { ISize, IStaticItemOptions } from '../interfaces';

export class MineStaticItem extends AStaticItem {

  public value: number = 100;

  constructor(options: IStaticItemOptions) {
    super(options);
    this.type =  EStaticItems.MINE;
    this.size = {
      width: 9,
      height: 9
    };
  }

  public render(ctx: any) {
    ctx.fillStyle = MINE_STATIC_ITEM_COLOR_FIRST;
    ctx.fillRect(this.position.x - 4, this.position.y - 4 , 9,9);
  }

}
