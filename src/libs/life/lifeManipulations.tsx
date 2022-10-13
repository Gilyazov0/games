import { Coordinates, RowData } from "../../dataTypes/gameFieldDataTypes";
import { GameManipulations as GM } from "../gameManipulations";

export class LifeManipulations extends GM {
  protected static populateField(field: RowData[], chance: number) {
    const newField = this.copyField(field);
    for (let rowNum = 0; rowNum < newField.length; rowNum++) {
      for (
        let cellNum = 0;
        cellNum < newField[rowNum].cells.length;
        cellNum++
      ) {
        newField[rowNum].cells[cellNum].isFilled = Math.random() < chance;
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

  static getNextStepField(field: RowData[]): RowData[] {
    const newField = this.copyField(field);
    for (let row = 0; row < newField.length; row++) {
      for (let col = 0; col < newField[row].cells.length; col++) {
        const liveNeighbors = this.countLiveNearbyCells(field, {
          y: row,
          x: col,
        });
        if (newField[row].cells[col].isFilled && [2, 3].includes(liveNeighbors))
          continue;
        else if (!newField[row].cells[col].isFilled && liveNeighbors === 3) {
          newField[row].cells[col].isFilled = true;
        } else newField[row].cells[col].isFilled = false;
      }
    }
    return newField;
  }
}
