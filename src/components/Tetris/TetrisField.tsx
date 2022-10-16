import React from "react";
import Info from "../Info";
import { gamesParameters as GP } from "../../libs/gamesParameters";
import { Direction } from "../../dataTypes/gameDataTypes";
import { FieldData } from "../../dataTypes/gameFieldDataTypes";
import { GameField, GameFieldProps as GF } from "../GameField";

export interface GameFieldProps extends GF {
  previewField?: FieldData;
}
export const TetrisField: React.FC<GameFieldProps> = (props) => {
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
        style={props.previewField ? { borderTop: "none" } : props.style}
        exitToMenu={props.exitToMenu}
      />

      {props.previewField && (
        <div
          className={`field--preview field--preview--${
            GP.direction === Direction.row ? "right" : "bottom"
          }`}
          style={{
            flexDirection: GP.direction === Direction.row ? "column" : "row",
          }}
        >
          <Info width={"100%"} score={props.score!} speed={props.speed!}></Info>
          <TetrisField
            field={{
              rows: props.previewField.rows,
            }}
            style={{ border: "none", marginTop: "0" }}
            previewField={undefined}
            exitToMenu={props.exitToMenu}
          />
          <button className="infoBadge exit--button" id={"exitToMenu"}>
            EXIT
          </button>
        </div>
      )}
    </div>
  );
};

export default TetrisField;
