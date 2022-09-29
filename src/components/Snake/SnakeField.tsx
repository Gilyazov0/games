import React from "react";
import Info from "../Info";
import { gameConstants as GC } from "../../libs/сonstants";
import { Direction } from "../../libs/interfaces";
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
        <button className="infoBadge exit--button" id={"exitToMenu"}>
          EXIT
        </button>
      </div>
    </div>
  );
};

export default SnakeField;
