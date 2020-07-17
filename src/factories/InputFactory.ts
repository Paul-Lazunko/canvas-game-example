import { ADynamicItem } from '../abstract';
import { Input } from '../core';
import { IPosition } from '../interfaces';

export class InputFactory {
  static inputs: Input[];

  static init(inputs: Input[]) {
    InputFactory.inputs = inputs
  }

  static input(target: ADynamicItem, position: Partial<IPosition>) {
    InputFactory.inputs.push(
      new Input({
        target,
        position,
      }));
  }
}
