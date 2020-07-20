export interface IGameOptions {
  dynamicItemsMaxCount?: number
  staticItemsMaxCount?: number
  fps?: number;
  addEnemyThresholdMs?: number;
  addStaticItemThresholdMs?: number;
  playerHealth?: number,
  gameOverHandler: (...args: any[]) => void

}
