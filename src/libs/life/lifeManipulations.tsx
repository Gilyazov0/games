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

  static countPopulatedNearbyCells(
    field: RowData[],
    coords: Coordinates
  ): number {
    let res = 0;
    const [rows, cols] = [field.length, field[0].cells.length];
    for (let row = coords.y - 1; row <= coords.y + 1; row++) {
      for (let col = coords.x - 1; col <= coords.x + 1; col++) {
        let x = row < 0 ? rows - 1 : row;
        x = row > rows - 1 ? 0 : row;
        let y = col < 0 ? cols - 1 : cols;
        y = col > cols - 1 ? 0 : col;

        if (field[y].cells[x].isFilled) res++;
      }
    }
    return res;
  }
}
