import React from "react";
import LifeField from "./LifeField";
import { LifeManipulations as GM } from "../../libs/life/lifeManipulations";
import { gamesParameters } from "../../libs/gamesParameters";
import {
  LifeGameParameters,
  LifeGameState,
} from "../../dataTypes/lifeDataTypes";
import useToggle from "../hooks/useToggle";

const Life: React.FC<{ exitToMenu: Function }> = (props) => {
  const GP = gamesParameters as LifeGameParameters;

  const [pause, togglePause] = useToggle();
  const [aboutOn, toggleAbout] = useToggle();

  const [state, setState] = React.useState<LifeGameState>({
    field: GM.getPopulatedField(GP.rows, GP.cols, GP.density),
    figure: GM.getNewFigure(),
    score: 0,
    speed: 10,
    lastTik: Date.now(),
    density: GP.density,
  });

  const setDensity = function (density: number) {
    setState((prevState) => ({ ...prevState, density: density }));
  };

  const setSpeed = function (speed: number) {
    setState((prevState) => ({ ...prevState, speed: speed }));
  };

  const restart = function () {
    setState((prevState) => ({
      ...prevState,
      field: GM.getPopulatedField(GP.rows, GP.cols, prevState.density),
    }));
  };

  const handleCellClick = (event: MouseEvent) => {
    let elem = event.target as HTMLDivElement;
    while (!elem.classList.contains("field--inner")) {
      elem = elem.parentElement as HTMLDivElement;
    }
    const rect = elem.getBoundingClientRect();
    const row = Math.floor((event.clientY - rect.top) / GP.cellSize);
    const col = Math.floor((event.clientX - rect.left) / GP.cellSize);

    setState((prevState) => {
      const newField = GM.copyField(prevState.field);
      if (newField[row].cells[col].isFilled) {
        newField[row].cells[col].isFilled = false;
        newField[row].cells[col].color = "rgb(255,255,255)";
      } else {
        newField[row].cells[col].isFilled = true;
        newField[row].cells[col].color = GP.colorsArr[0];
      }
      return { ...prevState, field: newField };
    });
  };

  React.useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === " ") {
        togglePause();
      }
    }
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [togglePause]);

  React.useEffect(() => {
    function makeMove() {
      setState((prevState) => {
        if (pause) return prevState;

        return {
          ...prevState,
          field: GM.getNextStepField(prevState.field),
          lastTik: Date.now(),
        };
      });
    }

    let interval = window.setInterval(
      makeMove,
      state.lastTik - Date.now() + GP.baseSpeed / state.speed
    );
    return () => {
      window.clearInterval(interval);
    };
  }, [GP.baseSpeed, pause, state.lastTik, state.speed]);

  React.useEffect(() => togglePause(aboutOn), [aboutOn, togglePause]);

  return (
    <LifeField
      score={state.score}
      field={{
        rows: state.field,
      }}
      pause={pause}
      speed={state.speed}
      exitToMenu={props.exitToMenu}
      setDensity={setDensity}
      setSpeed={setSpeed}
      density={state.density}
      restart={restart}
      handleCellClick={handleCellClick}
      togglePause={togglePause}
      aboutOn={aboutOn}
      toggleAbout={toggleAbout}
    />
  );
};

export default Life;
