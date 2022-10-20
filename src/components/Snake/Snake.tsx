import React, { useCallback } from "react";
import { SnakeManipulations as GM } from "../../libs/snake/snakeManipulations";
import SnakeField from "./SnakeField";
import {
  SnakeGameParameters,
  SnakeGameState,
} from "../../dataTypes/snakeDataTypes";
import { gamesParameters } from "../../libs/gamesParameters";
import { Actions } from "../../dataTypes/gameDataTypes";

const Snake: React.FC<{ exitToMenu: Function }> = (props) => {
  const GP = gamesParameters as SnakeGameParameters;

  const figure = GM.getNewFigure();
  GM.colorSnake(figure);
  const field = GM.getEmptyField(GP.rows, GP.cols);
  const [state, setState] = React.useState<SnakeGameState>({
    field: GM.putFood(figure, GP.applesCount, field),
    figure: figure,
    score: 0,
    speed: 1,
    pause: false,
    gameOver: false,
    lastTik: Date.now(),
  });

  const [action, setAction] = React.useState({
    nextAction: Actions.MoveLeft,
    currentAction: Actions.MoveLeft,
  });

  const moveFigure = useCallback(
    (dx: number, dy: number, rotate = false) => {
      setState((prevState: SnakeGameState) => {
        if (prevState.pause) return prevState;
        const newFigure = GM.getMovedFigure(
          prevState.figure,
          dx,
          dy,
          prevState.field
        );

        if (
          !GM.isValidPosition(prevState.figure, newFigure.figureCoordinates)
        ) {
          return { ...prevState, gameOver: true };
        }

        if (GM.isFood(newFigure.figureCoordinates, prevState.field)) {
          const newField = GM.clearCell(
            newFigure.figureCoordinates,
            prevState.field
          );
          return {
            ...prevState,
            figure: newFigure,
            lastTik: Date.now(),
            field: GM.putFood(newFigure, 1, newField),
            score: prevState.score + 1,
            speed: Math.ceil((prevState.score + 1) / GP.changeSpeedCoef),
          };
        } else
          return {
            ...prevState,
            figure: newFigure,
            lastTik: Date.now(),
          };
      });
    },
    [GP.changeSpeedCoef]
  );

  function togglePause() {
    setState((prevState) => {
      return { ...prevState, pause: !prevState.pause, gameOver: false };
    });
  }

  const handleUserInput = useCallback(
    (input: Actions): void => {
      switch (input) {
        case Actions.MoveUp:
          if (
            action.currentAction === Actions.MoveLeft ||
            action.currentAction === Actions.MoveRight
          ) {
            setAction((prevAction) => {
              return { ...prevAction, nextAction: Actions.MoveUp };
            });
          }
          break;
        case Actions.MoveDown:
          if (
            action.currentAction === Actions.MoveLeft ||
            action.currentAction === Actions.MoveRight
          ) {
            setAction((prevAction) => {
              return { ...prevAction, nextAction: Actions.MoveDown };
            });
          }
          break;
        case Actions.MoveLeft:
          if (
            action.currentAction === Actions.MoveUp ||
            action.currentAction === Actions.MoveDown
          ) {
            setAction((prevAction) => {
              return { ...prevAction, nextAction: Actions.MoveLeft };
            });
          }
          break;
        case Actions.MoveRight:
          if (
            action.currentAction === Actions.MoveUp ||
            action.currentAction === Actions.MoveDown
          ) {
            setAction((prevAction) => {
              return { ...prevAction, nextAction: Actions.MoveRight };
            });
          }
          break;
        case Actions.Pause:
          togglePause();
          break;
      }
    },
    [action.currentAction]
  );

  React.useEffect(() => {
    function handleTouchStart(event: TouchEvent): void {
      const x = event.changedTouches[0].clientX;
      const y = event.changedTouches[0].clientY;
      event.stopPropagation();
      if (y > window.innerHeight * (1 - GP.touchZoneSizeY)) {
        handleUserInput(Actions.MoveDown);
      } else if (y < window.innerHeight * GP.touchZoneSizeY) {
        handleUserInput(Actions.MoveUp);
      } else if (x < window.innerWidth * GP.touchZoneSizeX) {
        handleUserInput(Actions.MoveLeft);
      } else if (x > window.innerWidth * (1 - GP.touchZoneSizeX)) {
        handleUserInput(Actions.MoveRight);
      } else handleUserInput(Actions.Pause);
    }

    window.addEventListener("touchstart", handleTouchStart);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [GP.touchZoneSizeX, GP.touchZoneSizeY, action, handleUserInput]);

  React.useEffect(() => {
    function handleUserKeyPress(event: KeyboardEvent): void {
      switch (event.key) {
        case "ArrowUp":
          handleUserInput(Actions.MoveUp);
          break;
        case "ArrowDown":
          handleUserInput(Actions.MoveDown);
          break;
        case "ArrowLeft":
          handleUserInput(Actions.MoveLeft);
          break;
        case "ArrowRight":
          handleUserInput(Actions.MoveRight);
          break;
        case " ":
          handleUserInput(Actions.Pause);
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [action, handleUserInput]);

  React.useEffect(() => {
    function makeAction(): void {
      if (state.gameOver || state.pause) return;
      switch (action.nextAction) {
        case Actions.MoveUp:
          setAction({
            currentAction: Actions.MoveUp,
            nextAction: Actions.MoveUp,
          });
          moveFigure(0, -1, false);
          break;
        case Actions.MoveDown:
          setAction({
            currentAction: Actions.MoveDown,
            nextAction: Actions.MoveDown,
          });
          moveFigure(0, 1, false);
          break;
        case Actions.MoveLeft:
          setAction({
            currentAction: Actions.MoveLeft,
            nextAction: Actions.MoveLeft,
          });
          moveFigure(-1, 0, false);
          break;
        case Actions.MoveRight:
          setAction({
            currentAction: Actions.MoveRight,
            nextAction: Actions.MoveRight,
          });
          moveFigure(1, 0, false);
          break;
        default:
          break;
      }
    }

    let interval = window.setInterval(
      () => makeAction(),
      GP.baseSpeed / state.speed
    );
    return () => {
      window.clearInterval(interval);
    };
  }, [
    action,
    state.speed,
    state.lastTik,
    GP.baseSpeed,
    state.gameOver,
    moveFigure,
    state.pause,
  ]);

  return (
    <SnakeField
      field={{
        rows: GM.putFigure(state.figure, state.field),
      }}
      pause={state.pause}
      gameOver={state.gameOver}
      score={state.score}
      speed={state.speed}
      exitToMenu={props.exitToMenu}
    />
  );
};

export default Snake;
