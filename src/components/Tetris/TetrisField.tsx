import React from "react";
import Info from "../Info";
import { gameConstants as GC } from "../Constants";
import { Direction, FieldData, RowData } from "../../libs/interfaces";
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
        style={props.previewField ? { borderTop: "none" } : props.style}
        exitToMenu={props.exitToMenu}
      />

      {props.previewField && (
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
          <TetrisField
            field={{
              rows: props.previewField.rows,
              maxWidth: GC.cellSize * 3,
              maxHight: GC.cellSize * 4,
            }}
            style={{ border: "none" }}
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
