export interface Coordinates {
  x: number;
  y: number;
}

export interface AbstractCellData {
  color: string;
  isFilled: boolean;
}
export interface CellData extends AbstractCellData {
  cellSize: number;
}

export interface AbstractFigure {
  rotationPoint: Coordinates;
  cells: {
    relativeCoords: Coordinates;
    value: AbstractCellData;
  }[];
}
export interface Figure extends Omit<AbstractFigure, "cells"> {
  cells: {
    relativeCoords: Coordinates;
    value: CellData;
  }[];
  figureCoordinates: Coordinates;
}

export interface GameConstants {
  touchZoneSizeX: number;
  touchZoneSizeY: number;
  sensitivity: number;
  rows: number;
  cols: number;
  direction: Direction;
  cellSize: number;
  baseSpeed: number;
  colorsArr: string[];
  figuresArr: AbstractFigure[];
}

export enum Direction {
  "row",
  "column",
}

export interface RowData {
  cells: CellData[];
  cellsIds?: (number | string)[];
  id: number | string;
}

export interface GlassData {
  rows: RowData[];
  maxHight: number;
  maxWidth: number;
}

export interface GameState {
  glass: RowData[];
  score: number;
  speed: number;
  pause: boolean;
  gameOver: boolean;
  figure: Figure;
}
