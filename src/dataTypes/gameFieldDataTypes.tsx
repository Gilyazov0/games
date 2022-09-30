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

export interface RowData {
  cells: CellData[];
  cellsIds?: (number | string)[];
  id: number | string;
}

export interface FieldData {
  rows: RowData[];
  maxHight: number;
  maxWidth: number;
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
