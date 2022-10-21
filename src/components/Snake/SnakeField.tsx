import React from "react";
import Info from "../Info";
import { gamesParameters as GP } from "../../libs/gamesParameters";
import { Direction } from "../../dataTypes/gameDataTypes";
import { GameField, GameFieldProps } from "../GameField";
import AboutSnake from "./AboutSnake";

export const SnakeField: React.FC<GameFieldProps> = (props) => {
  return (
    <div
      className={`field--outer  field--outer--${
        GP.direction === Direction.row ? "right" : "bottom"
      }`}
      style={{
        flexDirection: GP.direction === Direction.row ? "row" : "column",
      }}
    >
      {props.aboutOn && <AboutSnake close={props.toggleAbout!} />}

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
          flexDirection: "column",
        }}
      >
        <div className={"infoBlock"}>
          <Info width={"100%"} score={props.score!} speed={props.speed!}></Info>
        </div>
        <div className={"infoBlock"}>
          {" "}
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
    </div>
  );
};

export default SnakeField;
