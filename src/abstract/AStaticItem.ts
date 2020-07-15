import { IPosition, ISize, IStaticItemOptions } from '../interfaces';

export abstract class AStaticItem {

  public type: string;
  public value: number;

  public position: IPosition;
  public size: ISize;

  constructor(options: IStaticItemOptions) {
    this.value = options.value;
    this.position = options.position;
  }

  abstract render(ctx: any): void

}
