import { Strategy } from '../strategy';
import { AWeapon } from './AWeapon';
import { IPosition, ISize } from '../interfaces';

export abstract class ADynamicItem {

  public health: number;
  public armor: number;
  public speed: number;
  public position: IPosition;
  public size: ISize;
  public weapons: AWeapon[];

  public strategy?: Strategy;

  abstract render(ctx: any): void
  abstract die(ctx: any): void


}
