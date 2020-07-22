```typescript
import { Game } from 'canvas-game-example-the-tanks';

const game: Game = new Game({
  dynamicItemsMaxCount: 6,
  staticItemsMaxCount: 30,
  fps: 50,
  addEnemyThresholdMs: 5000,
  addStaticItemThresholdMs: 1000,
  playerHealth: 500,
  gameOverHandler: () => {
    // Handle game over
  }
});
const canvas = document.getElementById('canvasId');
game.init(canvas).start();

// You have access to player health and weapon like: 
// game.player.health, game.player.weapons

```

WSDA - move

left click - fire

Q (scroll) - switch weapon

T - teleportation to mouse position

See example at https://paul-lazunko.github.io/
