import cloneDeep from "lodash.clonedeep";
import { gamesParameters as GP } from "./gamesParameters";
import {
  Figure,
  CellData,
  RowData,
  Coordinates,
} from "../dataTypes/gameFieldDataTypes";

export class GameManipulations {
  private static last_row_id = Number.MIN_VALUE;

  static clearCell(coords: Coordinates, field: RowData[]): RowData[] {
    const newField = this.copyField(field);
    newField[coords.y].cells[coords.x].isFilled = false;
    newField[coords.y].cells[coords.x].color = "#FFFFFF";
    return newField;
  }

  static getNewFigure(): Figure {
    const figNum: number = Math.floor(Math.random() * GP.figuresArr.length);
    const color: string = this.getRandomColor();
    return {
      ...GP.figuresArr[figNum],
      cells: GP.figuresArr[figNum].cells.map((cell) => ({
        ...cell,
        value: { ...cell.value, color: color } as CellData,
      })),
      figureCoordinates: { x: Math.floor((GP.cols - 2) / 2), y: 0 },
    };
  }

  static getEmptyField(rows: number, cols: number): RowData[] {
    const result = [];
    for (let i = 0; i < rows; i++) {
      result.push(this.getEmptyRow(cols));
    }
    return result;
  }

  static putFigure(figure: Figure, field: RowData[]) {
    const newField = this.copyField(field);
    for (let i = 0; i < figure.cells.length; i++) {
      const coords = this.getRealCords(figure, i);
      newField[coords.y].cells[coords.x] = {
        ...newField[coords.y].cells[coords.x],
        ...figure.cells[i].value,
      };
    }
    return newField;
  }

  protected static getRandomColor(): string {
    return GP.colorsArr[Math.floor(Math.random() * GP.colorsArr.length)];
  }

  protected static isInsideField(
    coords: Coordinates,
    rows: number,
    cols: number
  ): boolean {
    return coords.x >= 0 && coords.y >= 0 && coords.x < cols && coords.y < rows;
  }

  protected static getEmptyRow(cols: number): RowData {
    const row: CellData[] = new Array<CellData>(cols).fill({
      isFilled: false,
      color: "#FFFFFF",
      cellSize: GP.cellSize,
    });
    const res = { id: this.last_row_id, cells: row };
    this.last_row_id++;
    return res;
  }

  protected static copyRow(row: RowData): RowData {
    return cloneDeep(row);
  }

  protected static copyField(field: RowData[]): RowData[] {
    return cloneDeep(field);
  }

  protected static getRealCords(
    figure: Figure,
    cellIndex: number
  ): Coordinates {
    const result = {
      x: figure.figureCoordinates.x + figure.cells[cellIndex].relativeCoords.x,
      y: figure.figureCoordinates.y + figure.cells[cellIndex].relativeCoords.y,
    };
    return result;
  }
}
