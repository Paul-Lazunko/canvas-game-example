import { ADynamicItem, AStaticItem } from '../../abstract';
import { Input, Shot } from '../../core';

export interface IStrategyOptions {
  context: ADynamicItem,
  target: ADynamicItem,
  shots: Shot[],
  inputs: Input[],
  staticItems: AStaticItem[],
  kamikadzeMode: boolean,
  healthLimitValue: number,
  reactionDelay: number
}
