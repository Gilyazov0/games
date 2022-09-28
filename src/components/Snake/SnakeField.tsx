import React from "react";
import { Row, RowProps } from "../Row";
import Info from "../Info";
import Message from "../Message";
import { gameConstants as GC } from "../Constants";
import { Direction } from "../Interfaces";
import { GameField, GameFieldProps } from "../GameField";

export const SnakeField: React.FC<GameFieldProps> = (props) => {
  const button = document.getElementById("exitToMenu") as HTMLButtonElement;
  button?.addEventListener("click", () => props.exitToMenu());

  return (
    <div
      className={`field--outer  field--outer--${
        GC.direction === Direction.row ? "right" : "bottom"
      }`}
      style={{
        flexDirection: GC.direction === Direction.row ? "row" : "column",
      }}
    >
      <GameField
        score={props.score}
        field={props.field}
        gameOver={props.gameOver}
        pause={props.pause}
        speed={props.speed}
        exitToMenu={props.exitToMenu}
      />

      <div
        className={`field--preview field--preview--${
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
        <button className="exit--to--menu" id={"exitToMenu"}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default SnakeField;
