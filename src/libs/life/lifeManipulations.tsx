import {
  CellData,
  Coordinates,
  RowData,
} from "../../dataTypes/gameFieldDataTypes";
import { GameManipulations as GM } from "../gameManipulations";
import { gamesParameters as GP } from "../gamesParameters";

export class LifeManipulations extends GM {
  protected static populateField(field: RowData[], chance: number) {
    const newField = this.copyField(field);
    for (let rowNum = 0; rowNum < newField.length; rowNum++) {
      for (
        let cellNum = 0;
        cellNum < newField[rowNum].cells.length;
        cellNum++
      ) {
        if (Math.random() < chance) {
          newField[rowNum].cells[cellNum].color = GP.colorsArr[0];
          newField[rowNum].cells[cellNum].isFilled = true;
        } else {
          newField[rowNum].cells[cellNum].color = "rgb(255,255,255)";
          newField[rowNum].cells[cellNum].isFilled = false;
        }
      }
    }

    return newField;
  }

  static getPopulatedField(
    rows: number,
    cols: number,
    chance: number
  ): RowData[] {
    return this.populateField(this.getEmptyField(rows, cols), chance);
  }

  protected static countLiveNearbyCells(
    field: RowData[],
    coords: Coordinates
  ): number {
    let res = 0;
    const [rows, cols] = [field.length, field[0].cells.length];
    for (let row = coords.y - 1; row <= coords.y + 1; row++) {
      for (let col = coords.x - 1; col <= coords.x + 1; col++) {
        if (coords.y === row && coords.x === col) continue;

        let y = row < 0 ? rows - 1 : row;
        y = row > rows - 1 ? 0 : y;
        let x = col < 0 ? cols - 1 : col;
        x = col > cols - 1 ? 0 : x;

        if (field[y].cells[x].isFilled) res++;
      }
    }
    return res;
  }

  protected static getRGBvalues(rgb: string): number[] {
    return rgb
      .slice(4, -1)
      .split(",")
      .map((x) => Number(x));
  }

  protected static cellColorAging(cell: CellData): CellData {
    const [r, g, b] = this.getRGBvalues(cell.color);
    return { ...cell, color: `rgb(${r},${Math.max(g - 1, 0)},${b})` };
  }

  static getNextStepField(field: RowData[]): RowData[] {
    const newField = this.copyField(field);
    for (let row = 0; row < newField.length; row++) {
      for (let col = 0; col < newField[row].cells.length; col++) {
        const liveNeighbors = this.countLiveNearbyCells(field, {
          y: row,
          x: col,
        });
        if (
          newField[row].cells[col].isFilled &&
          [2, 3].includes(liveNeighbors)
        ) {
          newField[row].cells[col] = this.cellColorAging(
            newField[row].cells[col]
          );
        } else if (!newField[row].cells[col].isFilled && liveNeighbors === 3) {
          newField[row].cells[col].isFilled = true;
          newField[row].cells[col].color = GP.colorsArr[0];
        } else {
          newField[row].cells[col].isFilled = false;
          newField[row].cells[col].color = "rgb(255,255,255)";
        }
      }
    }
    return newField;
  }
}
