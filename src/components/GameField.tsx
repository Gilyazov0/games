import React from "react";
import Message from "./Message";
import { Row } from "./Row";
import { FieldData } from "../dataTypes/gameFieldDataTypes";
import { gamesParameters as GP } from "../libs/gamesParameters";

export interface GameFieldProps {
  pause?: boolean;
  gameOver?: boolean;
  score?: number;
  speed?: number;
  field: FieldData;
  style?: object;
  exitToMenu: Function;
}

export const GameField: React.FC<GameFieldProps> = (props) => {
  const field = props.field.rows;

  const rows = field.map((row) => (
    <Row key={row.id} cells={row.cells} ids={row.cellsIds} />
  ));

  const colsCount: number = field[0].cells.length;
  const rowsCount: number = field.length;
  const style = {
    ...props.style,
    width: `${GP.cellSize * colsCount}px`,
    height: `${GP.cellSize * rowsCount}px`,
  };

  return (
    <div className={`field--inner`} style={style}>
      {props.pause && !props.gameOver && <Message message={["PAUSE"]} />}
      {props.gameOver && (
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
  );
};
