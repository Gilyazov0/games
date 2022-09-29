import React from "react";
import { Cell } from "./Cell";
import { CellData } from "../libs/interfaces";

export interface RowProps {
  ids?: (number | string)[];
  cells: CellData[];
}

export const Row: React.FC<RowProps> = (props) => {
  if (props.ids && props.ids.length !== props.cells.length) {
    throw RangeError(
      `Number of cells and indexes is not equal.Number of cells = ${props.cells.length}. Number of indexes = ${props.ids}`
    );
  }

  const cells = props.cells.map((cell, index) => {
    return (
      <Cell
        key={props.ids ? props.ids[index] : index}
        data={{
          cellSize: cell.cellSize,
          color: props.cells[index].color,
          isFilled: props.cells[index].isFilled,
        }}
      />
    );
  });

  return <div className="row"> {cells} </div>;
};
export default Row;
