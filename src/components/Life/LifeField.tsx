import React from "react";
import { gamesParameters as GP } from "../../libs/gamesParameters";
import { Direction } from "../../dataTypes/gameDataTypes";
import { GameField } from "../GameField";
import { LifeFieldProps } from "../../dataTypes/lifeDataTypes";
import AboutLife from "./AboutLife";

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
      {props.aboutOn && <AboutLife close={props.toggleAbout!} />}

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
        className={`field--preview field--preview--right`}
        style={{
          flexDirection: "column",
        }}
      >
        <div className="infoBlock">
          <div className="sliderContainer infoBadge">
            <label htmlFor="density" className="sliderLabel">
              DENSITY:
            </label>
            <input
              name="density"
              className={"slider"}
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue={props.density}
              id="densitySlider"
              onChange={(event) => props.setDensity(event.target.value)}
            />
          </div>
          <button
            className="infoBadge info"
            id={"restart"}
            onClick={() => props.restart()}
            onMouseDown={(event) => event.preventDefault()}
          >
            RESTART
          </button>
        </div>

        <div className="infoBlock">
          <div className="infoBadge sliderContainer ">
            <label htmlFor="speed" className="sliderLabel">
              SPEED:
            </label>
            <input
              name="speed"
              className={"slider"}
              type="range"
              min="1"
              max="20"
              step="1"
              defaultValue={props.speed}
              id="densitySlider"
              onChange={(event) => props.setSpeed(event.target.value)}
            />
          </div>
          <button
            className="infoBadge info"
            id={"pause"}
            onClick={() => props.togglePause()}
            onMouseDown={(event) => event.preventDefault()}
          >
            PAUSE
          </button>
        </div>

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
          onMouseDown={(event) => event.preventDefault()}
        >
          EXIT
        </button>
      </div>
    </div>
  );
};

export default SnakeField;
