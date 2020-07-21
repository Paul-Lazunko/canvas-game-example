import { ADynamicItem } from '../abstract';
import { AWeapon } from '../abstract';
import { GAME_DEFAULT_RATE_LIMIT } from '../constants';
import { IPosition } from '../interfaces';
import { Shot } from '../core';

export class ShotFactory {
  static shots: Shot[];

  static init(shots: Shot[]) {
    ShotFactory.shots = shots
  }

  static shot(shooter: ADynamicItem, weapon: AWeapon, endPosition: IPosition) {
    if ( weapon.isActive ) {
      if ( weapon.ammoCount > 0 ) {
        for ( let i = 0; i < weapon.fireRate; i = i + 1 ) {
          if ( weapon.isActive ) {
            setTimeout(() => {
              if ( weapon.ammoCount > 0 ) {
                ShotFactory.shots.push(
                  new Shot({
                    shooter,
                    weapon,
                    endPosition: endPosition,
                    startPosition: {
                      x: weapon.position.x,
                      y: weapon.position.y
                    },
                    damage: weapon.damage,
                    distance: weapon.distance,
                    speed: weapon.speed,
                    renderShotMotion: weapon.renderShotMotion,
                    renderShotMotionEnd: weapon.renderShotMotionEnd
                  }));
                weapon.ammoCount = weapon.ammoCount - 1;
              }
              if ( i === weapon.fireRate -1 ) {
                weapon.isActive = false;
                setTimeout(() => {
                  weapon.isActive = true;
                }, Math.round(weapon.reload))
              }
            }, i*GAME_DEFAULT_RATE_LIMIT );
          }

        }
      }
    } else {
      setTimeout(() => {
        weapon.isActive = true;
      }, Math.round(weapon.reload))
    }


  }
}
