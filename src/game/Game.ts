import { ADynamicItem, AStaticItem, AWeapon } from '../abstract';
import {
  EOrientation,
  EStaticItems, GAME_AREA_DEFAULT_COLOR,
  GAME_DEFAULT_DYNAMIC_ITEMS_ADD_THRESHOLD_MS,
  GAME_DEFAULT_DYNAMIC_ITEMS_MAX_COUNT,
  GAME_DEFAULT_PLAYER_HEALTH_VALUE,
  GAME_DEFAULT_POSITION_THRESHOLD,
  GAME_DEFAULT_RATE_LIMIT,
  GAME_DEFAULT_STATIC_ITEMS_ADD_THRESHOLD_MS,
  GAME_DEFAULT_STATIC_ITEMS_MAX_COUNT, GAME_DEFAULT_STRATEGY_REACTION_DELAY, GAME_FLASH_COLOR
} from '../constants';
import { Shot } from '../core';
import { Tank } from '../dynamicItems';
import { EnemyFactory, InputFactory, PositionFactory, RandomStaticItemFactory, ShotFactory } from '../factories';
import { IGameOptions, IPosition, ISize } from '../interfaces';
import { Strategy } from '../strategy';
import { Cannon, Flamethrower, Laser, MachineGun, RocketLauncher } from '../weapons';

export class Game {

  protected ctx: any;

  public score: number;

  protected rateLimit: number;
  protected startTime: number;
  protected gameTime: number;
  protected area: ISize;
  public isRan: boolean;

  protected mousePosition: IPosition = {
    x: 0,
    y: 0
  };

  protected addStaticItemThresholdMs: number ;
  protected addStaticItemValueHolder: number = 0;
  protected addEnemyThresholdMs: number;
  protected addEnemyValueHolder: number = 0;

  protected staticItemsMaxCount: number;
  protected dynamicItemsMaxCount: number;

  protected playerHealth: number;

  protected dynamicItems: ADynamicItem[];
  protected staticItems: AStaticItem[];
  public inputs: any[];
  public shots: Shot[];
  protected deaths: ADynamicItem[];

  protected gameOverHandler: any;

  constructor(options: IGameOptions) {
    const {
      fps,
      addEnemyThresholdMs,
      addStaticItemThresholdMs,
      dynamicItemsMaxCount,
      staticItemsMaxCount,
      playerHealth,
      gameOverHandler
    } = options;
    this.score = 0;
    this.rateLimit = fps ? Math.round(1000/fps) : GAME_DEFAULT_RATE_LIMIT;
    this.addEnemyThresholdMs = addEnemyThresholdMs || GAME_DEFAULT_DYNAMIC_ITEMS_ADD_THRESHOLD_MS;
    this.addStaticItemThresholdMs = addStaticItemThresholdMs || GAME_DEFAULT_STATIC_ITEMS_ADD_THRESHOLD_MS;
    this.dynamicItemsMaxCount = dynamicItemsMaxCount || GAME_DEFAULT_DYNAMIC_ITEMS_MAX_COUNT;
    this.staticItemsMaxCount = staticItemsMaxCount || GAME_DEFAULT_STATIC_ITEMS_MAX_COUNT;
    this.playerHealth = playerHealth || GAME_DEFAULT_PLAYER_HEALTH_VALUE;
    this.startTime = Date.now();
    this.dynamicItems = [];
    this.staticItems = [];
    this.inputs = [];
    this.shots = [];
    this.deaths = [];
    this.area = {
      width: 0,
      height: 0
    };
    this.gameOverHandler = gameOverHandler
  }

  public get player() {
    return this.dynamicItems[0];
  }

  init(canvas: any) {
    const self = this;
    this.ctx = canvas.getContext('2d');
    this.area.width = canvas.width;
    this.area.height = canvas.height;
    canvas.onmousemove = function (e: any) {
      if ( self.isRan ) {
        e.preventDefault()
        const { offsetX, offsetY } = e;
        self.mousePosition = {
          x: offsetX,
          y: offsetY
        };
      }
    };
    ShotFactory.init(self.shots);
    InputFactory.init(self.inputs);
    window.onmousedown = function (e: any) {
      if ( self.isRan ) {
        e.preventDefault()
        ShotFactory.shot(self.dynamicItems[0], self.dynamicItems[0].weapons[0], self.mousePosition);
      }
    };
    window.onkeypress = function(e: any) {
      if ( self.isRan ) {
        e.preventDefault()
        switch(e.key) {
          case 'w':
          case 'W':
            InputFactory.input(self.dynamicItems[0], { y: -1 });
            break;
          case 's':
          case 'S':
            InputFactory.input(self.dynamicItems[0], { y: 1 });
            break;
          case 'd':
          case 'D':
            InputFactory.input(self.dynamicItems[0], { x: 1 });
            break;
          case 'a':
          case 'A':
            InputFactory.input(self.dynamicItems[0], { x: -1 });
            break;
          case 'q':
          case 'Q':
            self.dynamicItems[0].weapons.push(self.dynamicItems[0].weapons.shift());
            break;
          case 't':
          case 'T':
            self.dynamicItems[0].position = {
              x: self.mousePosition.x,
              y: self.mousePosition.y,
            };
            break;
        }
      }
    };
    this.gameTime = Date.now();
    this.addPlayer();
    this.isRan = true;
    return this;
  }

  public addPlayer() {
    const machineGun: MachineGun = new MachineGun();
    const cannon: Cannon = new Cannon();
    const flamethrower: Flamethrower = new Flamethrower();
    const laser: Laser = new Laser();
    const rocketLauncher = new RocketLauncher();
    const position: IPosition = PositionFactory.getPosition(
      this.area.width,
      this.area.height,
      GAME_DEFAULT_POSITION_THRESHOLD
    );
    const player: Tank = new Tank({
      position,
      weapons: [
        machineGun,
        cannon,
        flamethrower,
        rocketLauncher,
        laser
      ]
    });
    player.health = this.playerHealth;
    this.dynamicItems.unshift(player);
  }

  public start () {
    if ( this.isRan ) {
      const now = Date.now();
      const dt = now - this.gameTime;
      if ( dt >= this.rateLimit ) {
        this.gameTime += dt;
        this.update(dt);
      }
      window.requestAnimationFrame(this.start.bind(this));
    }
  }

  public stop() {
    this.isRan = false;
    this.inputs = [];
    this.shots = [];
    this.dynamicItems = [];
    this.staticItems = [];
    this.ctx.clearRect(0,0,this.area.width,this.area.height);
    if ( typeof this.gameOverHandler === 'function' ) {
      this.gameOverHandler();
    }
  }

  public update(dt: number) {
    try {
      this.addStaticItems(dt);
      this.addEnemy(dt);
      this.handleInputs(dt);
      this.handleItems(dt);
      this.handleShots(dt);
      this.render();
    } catch (e) {
      console.error(e);
    }
  }

  protected addStaticItems(dt: number) {
    this.addStaticItemValueHolder += dt;
    if (
      this.addStaticItemValueHolder >= this.addStaticItemThresholdMs
      && this.staticItems.length < this.staticItemsMaxCount
    ) {
      const position: IPosition = PositionFactory.getPosition(
        this.area.width,
        this.area.height,
        GAME_DEFAULT_POSITION_THRESHOLD
      );
      const item: AStaticItem = RandomStaticItemFactory.getRandomStaticItem({
        position
      });
      this.staticItems.push(item);
      this.addStaticItemValueHolder = 0;
    }
  }

  protected addEnemy(dt: number) {
    this.addEnemyValueHolder += dt;
    if ( this.addEnemyValueHolder >= this.addEnemyThresholdMs && this.dynamicItems.length <= this.dynamicItemsMaxCount) {
      const position: IPosition = PositionFactory.getPosition(
        this.area.width,
        this.area.height,
        GAME_DEFAULT_POSITION_THRESHOLD
      );
      const item: ADynamicItem = EnemyFactory.addEnemy(position);
      item.strategy = new Strategy({
        context: item,
        target: this.player,
        shots: this.shots,
        inputs: this.inputs,
        staticItems: this.staticItems,
        kamikadzeMode: Boolean(Math.round(Math.random())),
        healthLimitValue: Math.round(Math.random()*100),
        reactionDelay: GAME_DEFAULT_STRATEGY_REACTION_DELAY
      });
      this.dynamicItems.push(item);
      this.addEnemyValueHolder = 0;
    }
  }

  protected handleInputs(dt: number) {
    while (this.inputs.length) {
      const input = this.inputs.shift();
      const { target, position } = input;
      if ( target ) {
        const newPositionX: number = target.position.x + Math.round(position.x * target.speed );
        const newPositionY: number =target.position.y + Math.round(position.y * target.speed );
        if ( position.x && ( newPositionX > 0 ) && newPositionX <= Math.round(this.area.width - target.size.width/2) ) {
          target.position.x = target.position.x + Math.round(position.x * target.speed );
          target.orientation = EOrientation.HORIZONTAL
        }
        if ( position.y && ( newPositionY > 0 ) && newPositionY <=  Math.round(this.area.height - target.size.height/2) ) {
          target.position.y = target.position.y + Math.round(position.y * target.speed );
          target.orientation = EOrientation.VERTICAL
        }
      }
    }
  }

  protected handleItems(dt: number) {
    this.dynamicItems.forEach((item: ADynamicItem, itemIndex: number, items: ADynamicItem[]) => {
      if ( item ) {
        if ( !itemIndex ) {
          this.handlePlayerDynamicItemsInteraction(dt, item);
        }
        this.handleDynamicStaticItemsInteraction(item);
        if ( item.health <= 0 ) {
          this.deaths.push(item);
          items.splice(itemIndex, 1);
          if ( !itemIndex ) {
            setTimeout(() => {
              this.stop();
            }, 500)
          } else {
            this.score = this.score + 1;
          }
        }
      }
    });
  }

  protected handlePlayerDynamicItemsInteraction(dt: number, player: ADynamicItem) {
    this.dynamicItems
      .filter((item: ADynamicItem, index: number) => Boolean(index))
      .forEach((item: ADynamicItem) => {
        if ( item ) {
          const dx = Math.abs(player.position.x + player.size.width/2 - item.position.x - item.size.width/2);
          const dy = Math.abs(player.position.y + player.size.height/2 - item.position.y - item.size.height/2);
          const width: number = player.size.width/2 + item.size.width/2;
          const height: number = player.size.height/2 + item.size.height/2;
          if ( dx <= width && dy <= height ) {
            player.health -= 100;
            item.health -= 100;
          } else {
            item.strategy.apply(dt);
          }
        }
      })
  }

  protected handleDynamicStaticItemsInteraction(target: ADynamicItem) {
    const self = this;
    const { x, y } = target.position;
    const { width, height } = target.size;
    this.staticItems.forEach((item: AStaticItem, index: number) => {
      if ( item ) {
        const dx = Math.abs(x - item.position.x);
        const dy = Math.abs(y - item.position.y);
        const cx = Math.round(width/2 + item.size.width/2);
        const cy = Math.round(height/2 + item.size.height/2);
        if ( dx <=cx && dy <= cy ) {
          switch (item.type) {
            case EStaticItems.HEALTH:
              target.health += item.value;
              break;
            case EStaticItems.LIFE:
              target.health += item.value;
              break;
            case EStaticItems.MINE:
              target.health = target.health  - item.value;
              setTimeout(() => {
                self.renderFlash(item.position);
              }, Math.round(self.rateLimit * 1.5))
              break;
            default:
              target.weapons
                .filter((weapon: AWeapon) => item.type === weapon.name )
                .forEach((weapon: AWeapon, index: number, weapons: AWeapon[]) => {
                  weapons[index].ammoCount += item.value
                });
              break;
          }
          this.staticItems.splice(index, 1);
        }
      }
    });
  }

  protected handleShots(dt: number) {
    this.shots.forEach((shot: Shot) => {
      if ( shot ) {
        const { damage, weapon,speed, dynamicPosition, startPosition, endPosition, shooter } = shot;
        const dx = endPosition.x- startPosition.x;
        const dy = endPosition.y - startPosition.y;
        const c = Math.sqrt(dx**2 + dy**2);
        shot.dynamicPosition.x = dynamicPosition.x +  Math.round( speed *dt / 1000 * dx/c);
        shot.dynamicPosition.y = dynamicPosition.y +  Math.round(speed * dt / 1000  * dy/c );
        this.dynamicItems.forEach((item: ADynamicItem) => {
          if ( item ) {
            if ( item && item !== shooter ) {
              const diffX: number = dynamicPosition.x - (item.position.x + Math.round(item.size.width/2));
              const diffY: number = dynamicPosition.y - (item.position.y + Math.round(item.size.height/2));
              if (
                Math.abs(diffX) <= item.size.width + Math.round(weapon.damageSize.width/2)
                && Math.abs(diffY) <= item.size.height + Math.round(weapon.damageSize.height/2)
              ) {
                shot.isHit = true;
                item.health -= damage;
              }
            }
          }
        })
      }
    })
  }

  protected render() {
    this.ctx.clearRect(0,0,this.area.width,this.area.height);
    this.ctx.fillStyle = GAME_AREA_DEFAULT_COLOR;
    this.ctx.fillRect(0,0, this.area.width, this.area.height);
    this.renderStaticItems();
    this.renderDynamicItems();
    this.renderShots();
    this.renderDeaths();
  }

  protected renderDynamicItems() {
    const self = this;
    this.dynamicItems.forEach((item: ADynamicItem, index: number) => {
      if ( item ) {
        item.render(self.ctx);
        if (item.weapons.length ) {
          if ( index ) {
            item.weapons[0].render(self.ctx, item, self.dynamicItems[0].position)
          } else {
            item.weapons[0].render(self.ctx, item, self.mousePosition)
          }
        }
      }
    })
  }

  protected renderFlash(position: IPosition) {
    this.ctx.fillStyle = GAME_FLASH_COLOR;
    this.ctx.fillRect(
      position.x -20,
      position.y -20,
      41,
      41
    );
  }

  protected renderDeaths() {
    while(this.deaths.length) {
      const item: ADynamicItem = this.deaths.shift();
      if ( item ) {
        this.ctx.fillStyle ='#dd0';
        this.ctx.fillRect(
          item.position.x -20,
          item.position.y -20,
          item.size.width + 40,
          item.size.height + 40
        );
      }
    }
  }

  protected renderStaticItems() {
    const self = this;
    this.staticItems.forEach((item: AStaticItem) => {
      if ( item ) {
        item.render(self.ctx)
      }
    })
  }

  protected renderShots() {
    const self = this;
    this.shots.forEach((shot: Shot, shotIndex: number, shots: Shot[]) => {
      if ( shot ) {
        const { distance, dynamicPosition, endPosition, startPosition } = shot;
        const dx: number = dynamicPosition.x - startPosition.x;
        const dy: number = dynamicPosition.y - startPosition.y;
        const length: number = Math.sqrt(dx**2 + dy**2);
        if (shot.isHit || length >= distance ) {
          shot.renderShotMotionEnd(self.ctx, shot.dynamicPosition);
          shots.splice(shotIndex, 1);
        } else {
          shot.renderShotMotion({
            dx,
            dy,
            startPosition,
            ctx: self.ctx,
            position: dynamicPosition,
            endPosition: endPosition
          });
        }
      }
    })
  }
}
