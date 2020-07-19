```typescript
import { Game } from 'canvas-game-example-the-tanks';

const game: Game = new Game({
  dynamicItemsMaxCount: 6,
  staticItemsMaxCount: 30,
  fps: 50,
  addEnemyThresholdMs: 5000,
  addStaticItemThresholdMs: 1000,
  playerHealth: 500
});
const canvas = document.getElementById('canvasId');
game.init(canvas).start();

```

WSDA - move

left click - fire

Q - switch weapon

T - teleport to mouse position

Play and enjoy ;)
