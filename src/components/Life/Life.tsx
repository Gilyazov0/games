import React from "react";
import LifeField from "./LifeField";
import { LifeManipulations as GM } from "../../libs/life/lifeManipulations";
import { gamesParameters } from "../../libs/gamesParameters";
import {
  LifeGameParameters,
  LifeGameState,
} from "../../dataTypes/lifeDataTypes";
import { Recoverable } from "repl";

const Life: React.FC<{ exitToMenu: Function }> = (props) => {
  const GP = gamesParameters as LifeGameParameters;

  const [state, setState] = React.useState<LifeGameState>({
    field: GM.getPopulatedField(GP.rows, GP.cols, GP.density),
    figure: GM.getNewFigure(),
    gameOver: false,
    pause: false,
    score: 0,
    speed: 1,
    lastTik: Date.now(),
    density: GP.density,
  });

  const setDensity = function (density: number) {
    setState((prevState) => ({ ...prevState, density: density }));
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

    console.log(event);
  };

  React.useEffect(() => {
    function makeMove() {
      setState((prevState) => ({
        ...prevState,
        field: GM.getNextStepField(prevState.field),
        lastTik: Date.now(),
      }));
    }

    let interval = window.setInterval(
      makeMove,
      state.lastTik - Date.now() + GP.baseSpeed / state.speed
    );
    return () => {
      window.clearInterval(interval);
    };
  }, [state.speed, state.lastTik, GP.baseSpeed, state.gameOver]);

  return (
    <LifeField
      score={state.score}
      field={{
        rows: state.field,
        maxHight: 800,
        maxWidth: 1000,
      }}
      gameOver={state.gameOver}
      pause={state.pause}
      speed={state.speed}
      exitToMenu={props.exitToMenu}
      setDensity={setDensity}
      density={state.density}
      restart={restart}
      handleCellClick={handleCellClick}
    />
  );
};

export default Life;
