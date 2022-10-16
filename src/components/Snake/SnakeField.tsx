import React from "react";
import Info from "../Info";
import { gamesParameters as GP } from "../../libs/gamesParameters";
import { Direction } from "../../dataTypes/gameDataTypes";
import { GameField, GameFieldProps } from "../GameField";

export const SnakeField: React.FC<GameFieldProps> = (props) => {
  const button = document.getElementById("exitToMenu") as HTMLButtonElement;
  button?.addEventListener("click", () => props.exitToMenu());

  return (
    <div
      className={`field--outer  field--outer--${
        GP.direction === Direction.row ? "right" : "bottom"
      }`}
      style={{
        flexDirection: GP.direction === Direction.row ? "row" : "column",
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
          GP.direction === Direction.row ? "right" : "bottom"
        }`}
        style={{
          flexDirection: GP.direction === Direction.row ? "column" : "row",
        }}
      >
        <div className={"infoBlock"}>
          <Info width={"100%"} score={props.score!} speed={props.speed!}></Info>
        </div>

        <button className="infoBadge exit--button" id={"exitToMenu"}>
          EXIT
        </button>
      </div>
    </div>
  );
};

export default SnakeField;
