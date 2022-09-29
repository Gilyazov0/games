import React from "react";
import { SnakeManipulations as GM } from "../../libs/snake/snakeManipulations";
import SnakeField from "./SnakeField";

import { setConstants, gameConstants as GC } from "../Constants";
import { GameState as GS } from "../../libs/interfaces";

enum Actions {
  "MoveUp",
  "MoveDown",
  "MoveLeft",
  "MoveRight",
}

interface GameState extends GS {
  lastTik: number;
}

const Snake: React.FC<{ exitToMenu: Function }> = (props) => {
  const figure = GM.getNewFigure();
  GM.colorSnake(figure);
  const field = GM.getEmptyField(GC.rows, GC.cols);
  const [state, setState] = React.useState<GameState>({
    field: GM.putFood(figure, 5, field),
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

  function moveFigure(dx: number, dy: number, rotate = false) {
    setState((prevState: GameState) => {
      if (prevState.pause) return prevState;
      const newFigure = GM.getMovedFigure(
        prevState.figure,
        dx,
        dy,
        prevState.field
      );

      if (!GM.isValidPosition(prevState.figure, newFigure.figureCoordinates)) {
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
          speed: Math.ceil((prevState.score + 1) / 10),
        };
      } else
        return {
          ...prevState,
          figure: newFigure,
          lastTik: Date.now(),
        };
    });
  }

  function makeAction(): void {
    if (state.gameOver) return;
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

  function togglePause() {
    setState((prevState) => {
      return { ...prevState, pause: !prevState.pause, gameOver: false };
    });
  }

  function handleUserKeyPress(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowUp":
        if (
          action.currentAction === Actions.MoveLeft ||
          action.currentAction === Actions.MoveRight
        ) {
          setAction((prevAction) => {
            return { ...prevAction, nextAction: Actions.MoveUp };
          });
        }
        break;
      case "ArrowDown":
        if (
          action.currentAction === Actions.MoveLeft ||
          action.currentAction === Actions.MoveRight
        ) {
          setAction((prevAction) => {
            return { ...prevAction, nextAction: Actions.MoveDown };
          });
        }
        break;
      case "ArrowLeft":
        if (
          action.currentAction === Actions.MoveUp ||
          action.currentAction === Actions.MoveDown
        ) {
          setAction((prevAction) => {
            return { ...prevAction, nextAction: Actions.MoveLeft };
          });
        }
        break;
      case "ArrowRight":
        if (
          action.currentAction === Actions.MoveUp ||
          action.currentAction === Actions.MoveDown
        ) {
          setAction((prevAction) => {
            return { ...prevAction, nextAction: Actions.MoveRight };
          });
        }
        break;
      case " ":
        togglePause();
        break;
      default:
        break;
    }
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  React.useEffect(() => {
    let interval = window.setInterval(
      () => makeAction(),
      state.lastTik - Date.now() + GC.baseSpeed / state.speed
    );
    return () => {
      window.clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, state.speed, state.lastTik]);

  return (
    <SnakeField
      field={{
        rows: GM.putFigure(state.figure, state.field),
        maxWidth: Math.min(window.innerWidth, window.screen.width),
        maxHight: Math.min(window.innerHeight, window.screen.height),
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
