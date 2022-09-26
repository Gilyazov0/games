import React from "react";
import { Row } from "./row";
import Info from "./info";
import Message from "./message";
import { gameConstants as GC } from "./constants";
import { Direction, GlassData } from "./interfaces";

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
    <Row key={row.id} cells={row.cells} ids={row.cellsIds} />
  ));

  const colsCount: number = glass[0].cells.length;
  const rowsCount: number = glass.length;

  const style = {
    width: `${GC.cellSize * colsCount}px`,
    height: `${GC.cellSize * rowsCount}px`,
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
            GC.direction === Direction.row ? "right" : "bottom"
          }`}
          style={{
            flexDirection: GC.direction === Direction.row ? "column" : "row",
          }}
        >
          <Info
            width={GC.cellSize * 3 + 10}
            score={props.score!}
            speed={props.speed!}
          ></Info>
          <Glass
            glass={{
              rows: props.previewGlass.rows,
              maxWidth: GC.cellSize * 3,
              maxHight: GC.cellSize * 4,
            }}
            previewGlass={undefined}
          />
        </div>
      )}
    </div>
  );
};

export default Glass;
