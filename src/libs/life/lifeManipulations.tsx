import { RowData } from "../../dataTypes/gameFieldDataTypes";
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
}
