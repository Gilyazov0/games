import React from "react";
import { gamesParameters as GP } from "../../libs/gamesParameters";
import { Direction } from "../../dataTypes/gameDataTypes";
import { GameField } from "../GameField";
import { LifeFieldProps } from "../../dataTypes/lifeDataTypes";

export const SnakeField: React.FC<LifeFieldProps> = (props) => {
  // const button = document.getElementById("exitToMenu") as HTMLButtonElement;
  // button?.addEventListener("click", () => props.exitToMenu());

  // const slider = document.getElementById("densitySlider") as HTMLInputElement;
  // slider?.addEventListener("change", () => props.setDensity());

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
        <div className="slidecontainer">
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
        </div>
        <button
          className="infoBadge"
          id={"restart"}
          onClick={() => props.restart()}
        >
          RESTART
        </button>
        <button
          className="infoBadge exit--button"
          id={"exitToMenu"}
          onClick={() => props.exitToMenu}
        >
          EXIT
        </button>
      </div>
    </div>
  );
};

export default SnakeField;
