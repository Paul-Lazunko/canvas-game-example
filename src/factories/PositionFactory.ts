import { IPosition } from '../interfaces';

export class PositionFactory {
  public static getPosition(width: number, height: number, threshold: number): IPosition {
    const x: number = this.calculateValue(width, threshold);
    const y: number = this.calculateValue(height, threshold);
    return { x, y };
  }

  protected static calculateValue(maxValue: number, threshold: number) {
    return Math.round(Math.random() * ( maxValue - threshold ));
  }
}
