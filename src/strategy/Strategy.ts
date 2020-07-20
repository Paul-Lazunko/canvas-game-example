import { ADynamicItem, AStaticItem } from '../abstract';
import { EStaticItems } from '../constants';
import { Input, Shot } from '../core';
import { InputFactory, ShotFactory } from '../factories';
import { IPosition, IStrategyOptions } from '../interfaces';

export class Strategy {
  protected inputs: Input[];
  protected shots: Shot[];
  protected staticItems: AStaticItem[];
  protected target: ADynamicItem;
  protected context: ADynamicItem;
  protected kamikadzeMode: boolean;
  protected healthLimitValue: number;
  protected reactionDelay: number = 1000;
  protected reactionAccumulatorValue: number = 0;


  constructor(options: IStrategyOptions) {
    const {
      inputs,
      shots,
      staticItems,
      target,
      context,
      kamikadzeMode,
      healthLimitValue,
      reactionDelay
    } = options;
    this.context = context;
    this.target = target;
    this.shots = shots;
    this.inputs = inputs;
    this.staticItems = staticItems;
    this.kamikadzeMode = kamikadzeMode;
    this.healthLimitValue = healthLimitValue;
    this.reactionDelay = reactionDelay;
  }

  apply(dt: number) {
    const self = this;
    if ( this.reactionAccumulatorValue < this.reactionDelay ) {
      this.reactionAccumulatorValue +=dt;
    } else {
      if ( this.context.health <= this.healthLimitValue ) {
        const healthPosition = this.getNearestStaticItemPosition([
          EStaticItems.HEALTH,
          EStaticItems.LIFE
        ]);
        if ( healthPosition) {
          const dpx = healthPosition.x - this.context.position.x;
          const dpy =  healthPosition.y - this.context.position.y;
          InputFactory.input(this.context, {
            x: dpx > 0 ? 1 : dpx === 0 ? 0 : -1,
            y: dpy > 0 ? 1 : dpy === 0 ? 0 : -1
          });
        }
      }
      if ( !this.context.weapons[0].ammoCount ) {
        const ammoPosition = this.getNearestStaticItemPosition([
          this.context.weapons[0].name as EStaticItems
        ]);
        if ( ammoPosition) {
          const dax = ammoPosition.x - this.context.position.x;
          const day =  ammoPosition.y - this.context.position.y;
          InputFactory.input(this.context, {
            x: dax > 0 ? 1 : dax === 0 ? 0 : -1,
            y: day > 0 ? 1 : day === 0 ? 0 : -1
          });
        } else if ( this.kamikadzeMode ) {
          const dx =this.target.position.x - this.context.position.x;
          const dy = this.target.position.y - this.context.position.y;
          InputFactory.input(this.context, {
            x: dx > 0 ? 1 : dx === 0 ? 0 : -1,
            y: dy > 0 ? 1 : dy === 0 ? 0 : -1
          });
        }
      } else {
        const dx =this.target.position.x - this.context.position.x;
        const dy = this.target.position.y - this.context.position.y;
        const { distance } = this.context.weapons[0];
        const distanceToPlayer = Math.sqrt(dx ** 2 + dy ** 2);
        if ( distanceToPlayer <= distance ) {
          ShotFactory.shot(this.context, this.context.weapons[0], this.target.position);
          if ( this.kamikadzeMode ) {
            InputFactory.input(this.context, {
              x: dx > 0 ? 1 : dx === 0 ? 0 : -1,
              y: dy > 0 ? 1 : dy === 0 ? 0 : -1
            });
          }
        } else {
          InputFactory.input(this.context, {
            x: dx > 0 ? 1 : dx === 0 ? 0 : -1,
            y: dy > 0 ? 1 : dy === 0 ? 0 : -1
          });
        }
      }
      this.reactionAccumulatorValue = 0;
    }
  }

  protected getNearestStaticItemPosition(types: EStaticItems[]): IPosition {
    let target: AStaticItem;
    let distanceToNearest: number;
    this.staticItems
      .filter((item: AStaticItem) => types.includes(item.type as EStaticItems) )
      .forEach((item: AStaticItem, index, items: AStaticItem[]) => {
        const dx = item.position.x - this.context.position.x;
        const dy = item.position.y - this.context.position.y;
        const distanceToItem: number = Math.sqrt(dx ** 2 + dy ** 2);
        if ( distanceToNearest && distanceToNearest > distanceToItem ) {
          distanceToNearest = distanceToItem;
          target = item;
        } else {
          distanceToNearest = distanceToItem;
          target = item;
        }
      });
    return target && target.position;
  }



}
