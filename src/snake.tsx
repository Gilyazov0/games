import React from "react";
import { SnakeManipulations as GM } from "./components/snakeManipulations";
import SnakeField from "./components/snakeField";
import "./App.css";
import { setConstants, gameConstants as GC } from "./components/constants";
import { GameState as GS } from "./components/interfaces";

setConstants("snake");
enum Actions {
  "MoveUp",
  "MoveDown",
  "MoveLeft",
  "MoveRight",
}

interface GameState extends GS {
  lastTik: number;
}

const Snake: React.FC = () => {
  const f = GM.getNewFigure();
  f.cells[0].value.color = "#FFFFFF";

  const [state, setState] = React.useState<GameState>({
    glass: GM.putFood(f),
    figure: f,
    score: 0,
    speed: 1,
    pause: false,
    gameOver: false,
    lastTik: Date.now(),
  });
  const [action, setAction] = React.useState(Actions.MoveUp);

  function moveFigure(dx: number, dy: number, rotate = false) {
    setState((prevState: GameState) => {
      if (prevState.pause) return prevState;
      const newFigure = GM.getMovedFigure(
        prevState.figure,
        dx,
        dy,
        prevState.glass
      );

      if (!GM.isValidPosition(prevState.figure, newFigure.figureCoordinates)) {
        return { ...prevState, gameOver: true };
      }

      if (GM.isFood(newFigure.figureCoordinates, prevState.glass)) {
        return {
          ...prevState,
          figure: newFigure,
          lastTik: Date.now(),
          glass: GM.putFood(newFigure),
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
    switch (action) {
      case Actions.MoveUp:
        moveFigure(0, -1, false);
        break;
      case Actions.MoveDown:
        moveFigure(0, 1, false);
        break;
      case Actions.MoveLeft:
        moveFigure(-1, 0, false);
        break;
      case Actions.MoveRight:
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
        if (action === Actions.MoveLeft || action === Actions.MoveRight) {
          setAction(Actions.MoveUp);
        }
        break;
      case "ArrowDown":
        if (action === Actions.MoveLeft || action === Actions.MoveRight) {
          setAction(Actions.MoveDown);
        }
        break;
      case "ArrowLeft":
        if (action === Actions.MoveUp || action === Actions.MoveDown) {
          setAction(Actions.MoveLeft);
        }
        break;
      case "ArrowRight":
        if (action === Actions.MoveUp || action === Actions.MoveDown) {
          setAction(Actions.MoveRight);
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
    console.log(state.lastTik - Date.now() + 1000 / state.speed);
    let interval = window.setInterval(
      () => makeAction(),
      state.lastTik - Date.now() + 1000 / state.speed
    );
    return () => {
      window.clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, state.speed, state.lastTik]);

  return (
    <SnakeField
      glass={{
        rows: GM.putFigure(state.figure, state.glass),
        maxWidth: Math.min(window.innerWidth, window.screen.width),
        maxHight: Math.min(window.innerHeight, window.screen.height),
      }}
      pause={state.pause}
      gameOver={state.gameOver}
      score={state.score}
      speed={state.speed}
    />
  );
};

export default Snake;
