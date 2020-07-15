import { ADynamicItem } from '../abstract';
import { AWeapon } from '../abstract';
import { GAME_DEFAULT_RATE_LIMIT } from '../constants';
import { Input } from '../core/Input';
import { IPosition } from '../interfaces';
import { Shot } from '../core/Shot';

export class ShotFactory {
  static shots: Shot[];

  static init(shots: Shot[]) {
    ShotFactory.shots = shots
  }

  static shot(shooter: ADynamicItem, weapon: AWeapon, endPosition: IPosition) {
    for ( let i = 0; i < weapon.fireRate; i = i + 1 ) {
      if ( weapon.isActive ) {
        if ( weapon.ammoCount > 0 ) {
          setTimeout(() => {
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
                renderEnd: weapon.renderShotEnd,
                renderStart: weapon.renderShotStart
              }));
          }, i*GAME_DEFAULT_RATE_LIMIT );
          weapon.ammoCount = weapon.ammoCount - 1;
          weapon.isActive = false;
        }
      } else {
        setTimeout(() => {
          weapon.isActive = true;
        }, Math.round(weapon.reload))
      }

    }

  }
}
