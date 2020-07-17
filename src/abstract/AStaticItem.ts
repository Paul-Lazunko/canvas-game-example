import { IPosition, ISize, IStaticItemOptions } from '../interfaces';

export abstract class AStaticItem {

  public type: string;
  public value: number;
  public defaultValue: number;

  public position: IPosition;
  public size: ISize;

  protected constructor(options: IStaticItemOptions) {
    this.position = options.position;
  }

  abstract render(ctx: any): void

}
