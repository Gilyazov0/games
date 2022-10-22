import React from "react";
import Info from "../Info";
import { gamesParameters as GP } from "../../libs/gamesParameters";
import { Direction } from "../../dataTypes/gameDataTypes";
import { FieldData } from "../../dataTypes/gameFieldDataTypes";
import { GameField, GameFieldProps as GF } from "../GameField";
import AboutTetris from "./AboutTetris";

export interface GameFieldProps extends GF {
  previewField?: FieldData;
}
export const TetrisField: React.FC<GameFieldProps> = (props) => {
  return (
    <div
      className={`field--outer  field--outer--${
        GP.direction === Direction.row ? "right" : "bottom"
      }`}
      style={{
        flexDirection: GP.direction === Direction.row ? "row" : "column",
      }}
    >
      {props.aboutOn && <AboutTetris close={props.toggleAbout!} />}

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
          <div className="infoBlock">
            <Info
              width={"100%"}
              score={props.score!}
              speed={props.speed!}
            ></Info>{" "}
          </div>
          <TetrisField
            field={{
              rows: props.previewField.rows,
            }}
            style={{ border: "none", marginTop: "0" }}
            previewField={undefined}
            exitToMenu={props.exitToMenu}
          />
          <div className="infoBlock">
            <button
              className="infoBadge info"
              id={"about"}
              onClick={() => props.toggleAbout!()}
            >
              ABOUT
            </button>

            <button
              className="infoBadge exit--button"
              id={"exitToMenu"}
              onClick={() => props.exitToMenu()}
            >
              EXIT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TetrisField;
