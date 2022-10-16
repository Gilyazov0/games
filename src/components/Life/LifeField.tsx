import React from "react";
import { gamesParameters as GP } from "../../libs/gamesParameters";
import { Direction } from "../../dataTypes/gameDataTypes";
import { GameField } from "../GameField";
import { LifeFieldProps } from "../../dataTypes/lifeDataTypes";

export const SnakeField: React.FC<LifeFieldProps> = (props) => {
  return (
    <div
      className={`field--outer  field--outer--${
        GP.direction === Direction.row ? "right" : "bottom"
      }`}
      style={{
        flexDirection: GP.direction === Direction.row ? "row" : "column",
      }}
    >
      <div onClick={(event) => props.handleCellClick(event)}>
        <GameField
          score={props.score}
          field={props.field}
          gameOver={props.gameOver}
          pause={props.pause}
          speed={props.speed}
          exitToMenu={props.exitToMenu}
        />
      </div>
      <div
        className={`field--preview field--preview--${
          GP.direction === Direction.row ? "right" : "bottom"
        }`}
        style={{
          flexDirection: GP.direction === Direction.row ? "column" : "row",
        }}
      >
        <div className="infoBlock">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue={props.density}
            className="slider"
            id="densitySlider"
            onChange={(event) => props.setDensity(event.target.value)}
          />
          <button
            className="infoBadge"
            id={"restart"}
            onClick={() => props.restart()}
          >
            RESTART
          </button>
        </div>

        <button
          className="infoBadge infoBlock"
          id={"pause"}
          onClick={() => props.togglePause()}
        >
          PAUSE
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
  );
};

export default SnakeField;
