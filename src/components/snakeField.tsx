import React from "react";
import { Row, RowProps } from "./row";
import Info from "./info";
import Message from "./message";
import { gameConstants as GC } from "./constants";
import { Direction } from "./interfaces";
// data needed to render a row
import { RowData } from "./interfaces";

//data needed to render a glass
interface GlassData {
  rows: RowData[];
  maxHight: number;
  maxWidth: number;
}

export interface GameFieldProps {
  pause?: boolean;
  gameOver?: boolean;
  previewGlass?: GlassData;
  score?: number;
  speed?: number;
  glass: GlassData;
}

export const SnakeField: React.FC<GameFieldProps> = (props) => {
  const glass = props.glass.rows;

  const rows = glass.map((row) => (
    <Row key={row.id} cells={row.cells} ids={row.cellsIds} />
  ));

  const style = {
    width: `${GC.cellSize * GC.cols}px`,
    height: `${GC.cellSize * GC.rows}px`,
  };

  return (
    <div
      className={`glass--outer  glass--outer--${
        GC.direction === Direction.row ? "right" : "bottom"
      }`}
      style={{
        flexDirection: GC.direction === Direction.row ? "row" : "column",
      }}
    >
      <div className={"glass--inner"} style={style}>
        {rows}
      </div>
    </div>
  );
};

export default SnakeField;
