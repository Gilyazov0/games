import { GameParameters, GameState } from "./gameDataTypes";
import { Figure } from "./gameFieldDataTypes";

export interface TetrisGameParameters extends GameParameters {
  sensitivity: number;
}

export interface TetrisGameState extends GameState {
  nextFigure: Figure;
}
