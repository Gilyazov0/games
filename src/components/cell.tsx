import React from "react";
import { CellData } from "./interfaces";

export interface CellProps {
  data: CellData;
}

export const Cell: React.FC<CellProps> = (props) => {
  if (!props.data.cellSize) throw Error("Attempting to render zero size cell");

  const style = {
    width: `${props.data.cellSize}px`,
    height: `${props.data.cellSize}px`,
  };
  return (
    <div style={style} className="cell--outer">
      <div
        className={`cell ${props.data.isFilled ? "cell--full" : "cell--empty"}`}
        style={{ backgroundColor: props.data.color }}
      ></div>
    </div>
  );
};
export default Cell;
