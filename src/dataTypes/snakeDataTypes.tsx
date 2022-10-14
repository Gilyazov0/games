import { GameParameters, GameState } from "./gameDataTypes";

export interface SnakeGameParameters extends GameParameters {
  applesCount: number;
}

export interface SnakeGameState extends GameState {
  lastTik: number;
}
