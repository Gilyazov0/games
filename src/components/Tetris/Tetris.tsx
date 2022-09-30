import React from "react";
//import shortid from "shortid";
import { gamesParameters } from "../../libs/gamesParameters";
import { TetrisGameParameters } from "../../dataTypes/tetrisDataTypes";
import { TetrisManipulations as GM } from "../../libs/tetris/tetrisManipulations";
import { Actions } from "../../dataTypes/gameDataTypes";
import { TetrisGameState } from "../../dataTypes/tetrisDataTypes";
import TetrisField from "./TetrisField";

const App: React.FC<{ exitToMenu: Function }> = (props) => {
  const GP = gamesParameters as TetrisGameParameters;

  const [state, setState] = React.useState<TetrisGameState>({
    field: GM.getEmptyField(GP.rows, GP.cols),
    figure: GM.getNewFigure(),
    nextFigure: GM.getNewFigure(),
    score: 0,
    speed: 1,
    pause: false,
    gameOver: false,
  });

  const [action, setAction] = React.useState<Actions | null>(null);

  function togglePause() {
    setState((prevState) => {
      return { ...prevState, pause: !prevState.pause, gameOver: false };
    });
  }

  function moveFigure(dx: number, dy: number, rotate = false) {
    setState((prevState: TetrisGameState) => {
      if (prevState.pause) return prevState;
      const newFigure = GM.getMovedFigure(prevState.figure, dx, dy, rotate);
      if (GM.isValidPosition(newFigure, prevState.field))
        return {
          ...prevState,
          figure: newFigure,
        };
      else if (dy > 0) {
        if (prevState.figure.figureCoordinates.y === 0) {
          return {
            ...prevState,
            figure: prevState.nextFigure,
            nextFigure: GM.getNewFigure(),
            field: GM.getEmptyField(GP.rows, GP.cols),
            lastScore: prevState.score,
            lastSpeed: prevState.speed,
            speed: 1,
            score: 0,
            gameOver: true,
            pause: true,
          };
        } else {
          let { field: newField, add_score } = GM.getClearedField(
            GM.putFigure(prevState.figure, prevState.field)
          );

          setAction(null);

          return {
            ...prevState,
            figure: prevState.nextFigure,
            nextFigure: GM.getNewFigure(),
            field: newField,
            score: prevState.score + add_score,
            speed:
              1 +
              Math.floor((prevState.score + add_score) / GP.changeSpeedCoef),
          };
        }
      } else {
        return prevState;
      }
    });
  }

  function handleUserKeyPress(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowUp":
        setAction(Actions.Rotate);
        break;
      case "ArrowDown":
        setAction(Actions.MoveDown);
        break;
      case "ArrowLeft":
        setAction(Actions.MoveLeft);
        break;
      case "ArrowRight":
        setAction(Actions.MoveRight);
        break;
      case " ":
        togglePause();
        break;
      default:
        break;
    }
  }

  function makeAction(): void {
    switch (action) {
      case Actions.Rotate:
        moveFigure(0, 0, true);
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

  function handleTouchStart(event: TouchEvent): void {
    const x = event.changedTouches[0].clientX;
    const y = event.changedTouches[0].clientY;
    event.stopPropagation();
    event.preventDefault();
    if (y > window.innerHeight * (1 - GP.touchZoneSizeY))
      setAction(Actions.MoveDown);
    else if (y < window.innerHeight * GP.touchZoneSizeY) togglePause();
    else if (x < window.innerWidth * GP.touchZoneSizeX)
      setAction(Actions.MoveLeft);
    else if (x > window.innerWidth * (1 - GP.touchZoneSizeX))
      setAction(Actions.MoveRight);
    else setAction(Actions.Rotate);
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const clearAction = () => setAction(null);
    window.addEventListener("keyup", clearAction);
    return () => {
      window.removeEventListener("keyup", clearAction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    makeAction();
    let interval = window.setInterval(() => makeAction(), GP.sensitivity);
    return () => {
      window.clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  React.useEffect(() => {
    let interval = window.setInterval(
      () => moveFigure(0, 1),
      GP.baseSpeed / state.speed
    );
    return () => {
      window.clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.speed]);

  React.useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const clearAction = () => setAction(null);
    window.addEventListener("touchend", clearAction);
    return () => {
      window.removeEventListener("touchend", clearAction);
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <TetrisField
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
          previewField={{
            rows: GM.putFigure(
              { ...state.nextFigure, figureCoordinates: { x: 0, y: 0 } },
              GM.getEmptyField(4, 3)
            ),
            maxHight: 1,
            maxWidth: 1,
          }}
        />
      </header>
    </div>
  );
};

export default App;
