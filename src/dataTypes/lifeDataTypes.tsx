import { GameFieldProps } from "../components/GameField";
import { GameParameters, GameState } from "./gameDataTypes";

export interface LifeGameParameters extends GameParameters {
  density: number;
}

export interface LifeGameState extends GameState {
  lastTik: number;
  density: number;
}

export interface LifeFieldProps extends GameFieldProps {
  setDensity: Function;
  density: number;
  restart: Function;
  handleCellClick: Function;
  togglePause: Function;
}
