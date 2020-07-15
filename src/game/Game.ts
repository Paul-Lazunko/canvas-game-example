import { ADynamicItem, AStaticItem, AWeapon } from '../abstract';
import { EOrientation, EStaticItems, GAME_DEFAULT_RATE_LIMIT } from '../constants';
import { Shot } from '../core';
import { Tank } from '../dynamicItems';
import { EnemyFactory, InputFactory, RandomStaticItemFactory, ShotFactory } from '../factories';
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
  protected isRun: boolean;

  protected mousePosition: IPosition = {
    x: 20,
    y: 20
  };

  protected addStaticItemLimit: number = 4000;
  protected addStaticItemValueHolder: number = 0;
  protected addEnemyLimit: number = 10000;
  protected addEnemyValueHolder: number = 0;

  protected maxStaticItemsCount: number = 20;
  protected maxDynamicItemsCount: number = 5;

  protected dynamicItems: ADynamicItem[];
  protected staticItems: AStaticItem[];
  public inputs: any[];
  public shots: Shot[];
  protected deaths: ADynamicItem[];

  constructor() {
    this.score = 0;
    this.rateLimit = GAME_DEFAULT_RATE_LIMIT;
    this.startTime = Date.now();
    this.dynamicItems = [];
    this.staticItems = [];
    this.inputs = [];
    this.shots = [];
    this.deaths = [];
    this.area = {
      width: 0,
      height: 0
    }
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
      const { offsetX, offsetY } = e;
      self.mousePosition = {
        x: offsetX,
        y: offsetY
      };
    };
    ShotFactory.init(self.shots);
    InputFactory.init(self.inputs);
    window.onmousedown = function (e: any) {
      ShotFactory.shot(self.dynamicItems[0], self.dynamicItems[0].weapons[0], self.mousePosition);
    };
    window.onkeypress = function(e: any) {
      switch(e.key) {
        case 'w':
          InputFactory.input(self.dynamicItems[0], { y: -1 });
          break;
        case 's':
          InputFactory.input(self.dynamicItems[0], { y: 1 });
          break;
        case 'd':
          InputFactory.input(self.dynamicItems[0], { x: 1 });
          break;
        case 'a':
          InputFactory.input(self.dynamicItems[0], { x: -1 });
          break;
        case 'q':
          self.dynamicItems[0].weapons.push(self.dynamicItems[0].weapons.shift());
          break;
        case 't':
          self.dynamicItems[0].position = {
            x: self.mousePosition.x,
            y: self.mousePosition.y,
          };
          break;
      }
    };
    this.gameTime = Date.now();
    this.isRun = true;
    this.addPlayer();
    return this;
  }

  public addPlayer() {
    const machineGun: MachineGun = new MachineGun();
    const cannon: Cannon = new Cannon();
    const flamethrower: Flamethrower = new Flamethrower();
    const laser: Laser = new Laser();
    const rocketLauncher = new RocketLauncher();
    const player: Tank = new Tank({
      weapons: [
        machineGun,
        cannon,
        flamethrower,
        rocketLauncher,
        laser
      ],
      position: {
        x: Math.round(Math.random() * (this.area.width - 20)),
        y: Math.round(Math.random() * (this.area.height - 20)),
      }
    });
    player.health = 1000;
    this.dynamicItems.unshift(player);
  }

  public start () {
    const now = Date.now();
    const dt = now - this.gameTime;
    if ( dt >= this.rateLimit && this.isRun ) {
      this.gameTime += dt;
      this.update(dt);
    }
    window.requestAnimationFrame(this.start.bind(this));
  }

  public stop() {
    this.isRun = false;
    this.inputs = [];
    this.shots = [];
    this.dynamicItems = [];
    this.staticItems = [];
    this.ctx.clearRect(0,0,this.area.width,this.area.height);
    alert('Game over');
  }

  public update(dt: number) {
    this.addStaticItems(dt);
    this.addEnemy(dt);
    this.handleInputs(dt);
    this.handleItems(dt);
    this.handleShots(dt);
    this.render();
  }

  protected addStaticItems(dt: number) {
    this.addStaticItemValueHolder += dt;
    if ( this.addStaticItemValueHolder >= this.addStaticItemLimit && this.staticItems.length < this.maxStaticItemsCount ) {
      const value: number = Math.round(Math.random() * 20);
      const position: IPosition = {
        x: Math.round(Math.random() * (this.area.width - 20)),
        y: Math.round(Math.random() * (this.area.height - 20)),
      };
      if ( position.x >= this.area.width ) {
        position.x = this.area.width - 20
      }
      if ( position.y >= this.area.height ) {
        position.y = this.area.height - 20
      }
      const item: AStaticItem = RandomStaticItemFactory.getRandomStaticItem({
        position,
        value
      });
      this.staticItems.push(item);
      this.addStaticItemValueHolder = 0;
    }
  }

  protected addEnemy(dt: number) {
    this.addEnemyValueHolder += dt;
    if ( this.addEnemyValueHolder >= this.addEnemyLimit && this.dynamicItems.length <= this.maxDynamicItemsCount) {
      const position: IPosition = {
        x: Math.round(Math.random() * (this.area.width - 20)),
        y: Math.round(Math.random() * (this.area.height - 20)),
      };
      const item: ADynamicItem = EnemyFactory.addEnemy(position);
      item.strategy = new Strategy({
        context: item,
        target: this.player,
        shots: this.shots,
        inputs: this.inputs,
        staticItems: this.staticItems,
        kamikadzeMode: Boolean(Math.round(Math.random())),
        healthLimitValue: 30
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
        if ( position.x && newPositionX > 0 && newPositionX <= this.area.width ) {
          target.position.x = target.position.x + Math.round(position.x * target.speed );
          target.orientation = EOrientation.HORIZONTAL
        }
        if ( position.y && newPositionY > 0 && newPositionY <= this.area.height  ) {
          target.position.y = target.position.y + Math.round(position.y * target.speed );
          target.orientation = EOrientation.VERTICAL
        }
      }
    }
  }

  protected handleItems(dt: number) {
    this.dynamicItems.forEach((item: ADynamicItem) => {
      if ( item ) {
        this.handleDynamicStaticItemsInteraction(item)
      }
    });
    this.handlePlayerDynamicItemsInteraction(dt);
    this.dynamicItems.forEach((item: ADynamicItem, itemIndex: number, items: ADynamicItem[]) => {
      if ( item && item.health <= 0 ) {
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
    });
  }

  protected handlePlayerDynamicItemsInteraction(dt: number) {
    const { player } = this;
    this.dynamicItems
      .filter((item: ADynamicItem, index: number) => Boolean(index))
      .forEach((item: ADynamicItem, index: number, items: ADynamicItem[]) => {
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
    this.shots.forEach((shot: Shot, shotIndex: number, shots: Shot[]) => {
      if ( shot ) {
        const { damage, speed, dynamicPosition, startPosition, endPosition, shooter } = shot;
        const dx = endPosition.x- startPosition.x;
        const dy = endPosition.y - startPosition.y;
        const c = Math.sqrt(dx**2 + dy**2);
        shot.dynamicPosition.x = dynamicPosition.x +  Math.round( speed *dt / 1000 * dx/c);
        shot.dynamicPosition.y = dynamicPosition.y +  Math.round(speed * dt / 1000  * dy/c );
        this.dynamicItems.forEach((item: ADynamicItem, itemIndex: number, items: ADynamicItem[]) => {
          if ( item && item !== shooter ) {
            const diffX: number = dynamicPosition.x - (item.position.x + Math.round(item.size.width/2));
            const diffY: number = dynamicPosition.y - (item.position.y + Math.round(item.size.height/2));
            if ( Math.abs(diffX) <= item.size.width  && Math.abs(diffY) <= item.size.height) {
              shot.isHit = true;
              item.health -= damage;
            }
          }
        })
      }
    })
  }

  protected render() {
    this.ctx.clearRect(0,0,this.area.width,this.area.height);
    this.renderStaticItems();
    this.renderDynamicItems();
    this.renderShots();
    this.renderDeaths();
  }

  protected renderDynamicItems() {
    const self = this;
    if ( self.ctx ) {
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
  }

  protected renderDeaths() {
    while(this.deaths.length) {
      const item: ADynamicItem = this.deaths.shift();
      this.ctx.fillStyle ='#dd0';
      this.ctx.fillRect(item.position.x -20, item.position.y -20, item.size.width + 40, item.size.height + 40);
    }
  }

  protected renderStaticItems() {
    const self = this;
    if ( self.ctx ) {
      this.staticItems.forEach((item: AStaticItem, index: number) => {
        if ( item ) {
          item.render(self.ctx);
        }
      })
    }
  }

  protected renderShots() {
    const self = this;
    if ( self.ctx ) {
      this.shots.forEach((shot: Shot, shotIndex: number, shots: Shot[]) => {
        if ( shot ) {
          const { distance, dynamicPosition, endPosition, startPosition } = shot;
          const dx: number = dynamicPosition.x - startPosition.x;
          const dy: number = dynamicPosition.y - startPosition.y;
          const length: number = Math.sqrt(dx**2 + dy**2);
          if (shot.isHit || length >= distance ) {
            shot.renderEnd(self.ctx, shot.dynamicPosition);
            shots.splice(shotIndex, 1);
          } else {
            shot.renderStart({
              ctx: self.ctx,
              dx,
              dy,
              position: dynamicPosition,
              endPosition: endPosition
            });
          }
        }
      })
    }
  }
}
