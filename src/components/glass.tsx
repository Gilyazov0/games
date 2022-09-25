import React from "react";
import { Row, RowProps } from "./row";
import Info from "./info";
import Message from "./message";
import {
  CELL_SIZE,
  DIRECTION,
  COLS_NUM,
  ROWS_NUM,
  Direction,
} from "./constants";

// data needed to render a row
export interface RowData {
  row: RowProps;
  id: string | number;
}

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

export const Glass: React.FC<GameFieldProps> = (props) => {
  const glass = props.glass.rows;

  const rows = glass.map((row) => (
    <Row key={row.id} cells={row.row.cells} ids={row.row.ids} />
  ));

  const style = {
    width: `${CELL_SIZE * COLS_NUM}px`,
    height: `${CELL_SIZE * ROWS_NUM}px`,
  };

  return (
    <div
      className={`glass--outer  glass--outer--${
        DIRECTION === Direction.row ? "right" : "bottom"
      }`}
      style={{ flexDirection: DIRECTION === Direction.row ? "row" : "column" }}
    >
      <div className={props.previewGlass ? "glass--inner" : ""} style={style}>
        {props.previewGlass && props.pause && !props.gameOver && (
          <Message message={["PAUSE"]} />
        )}
        {props.previewGlass && props.gameOver && (
          <Message
            message={[
              "GAME OVER",
              `YOUR SCORE ${props.score}`,
              `SPEED ${props.speed}`,
            ]}
          />
        )}

        {rows}
      </div>

      {/* Rendering of preview glass */}
      {props.previewGlass && (
        <div
          className={`glass--preview glass--preview--${
            DIRECTION === Direction.row ? "right" : "bottom"
          }`}
          style={{
            flexDirection: DIRECTION === Direction.row ? "column" : "row",
          }}
        >
          <Info
            width={CELL_SIZE * 3 + 10}
            score={props.score!}
            speed={props.speed!}
          ></Info>
          <Glass
            glass={{
              rows: props.previewGlass.rows,
              maxWidth: CELL_SIZE * 3,
              maxHight: CELL_SIZE * 4,
            }}
            previewGlass={undefined}
          />
        </div>
      )}
    </div>
  );
};

export default Glass;
