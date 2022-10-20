import { RowData, Figure, AbstractFigure } from "./gameFieldDataTypes";

export enum Apps {
  "menu",
  "snake",
  "tetris",
  "life",
}

export interface GameParameters {
  touchZoneSizeX: number;
  touchZoneSizeY: number;
  changeSpeedCoef: number;
  rows: number;
  cols: number;
  direction: Direction;
  cellSize: number;
  baseSpeed: number;
  colorsArr: string[];
  figuresArr: AbstractFigure[];
}

export enum Actions {
  "MoveUp",
  "MoveDown",
  "MoveLeft",
  "MoveRight",
  "Rotate",
  "Pause",
}

export interface GameState {
  field: RowData[];
  score: number;
  speed: number;
  figure: Figure;
}

export enum Direction {
  "row",
  "column",
}
