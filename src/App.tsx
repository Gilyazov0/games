import "./App.css";
import { Glass, RowData } from "./components/glass";
import React from "react";
//import shortid from "shortid";
import {
  TOUCH_ZONE_SIZE_X,
  SENSITIVITY,
  TOUCH_ZONE_SIZE_Y,
  Figure,
  ROWS_NUM,
  COLS_NUM,
} from "./components/constants";
import { GlassManipulations as GM } from "./components/glassManipulations";
interface GameState {
  glass: RowData[];
  score: number;
  speed: number;
  pause: boolean;
  gameOver: boolean;
  figure: Figure;
  nextFigure: Figure;
}

const App: React.FC = () => {
  const [state, setState] = React.useState<GameState>({
    glass: GM.getEmptyGlass(ROWS_NUM, COLS_NUM),
    figure: GM.getNewFigure(COLS_NUM),
    nextFigure: GM.getNewFigure(COLS_NUM),
    score: 0,
    speed: 1,
    pause: false,
    gameOver: false,
  });

  const [action, setAction] = React.useState("");

  function togglePause() {
    setState((prevState) => {
      console.log(prevState);
      return { ...prevState, pause: !prevState.pause, gameOver: false };
    });
  }

  function moveFigure(dx: number, dy: number, rotate = false) {
    setState((prevState: GameState) => {
      if (prevState.pause) return prevState;
      const newFigure = GM.getMovedFigure(prevState.figure, dx, dy, rotate);
      if (GM.isValidPosition(newFigure, prevState.glass))
        return {
          ...prevState,
          figure: newFigure,
        };
      else if (dy > 0) {
        if (prevState.figure.y === 0) {
          return {
            ...prevState,
            figure: prevState.nextFigure,
            nextFigure: GM.getNewFigure(COLS_NUM),
            glass: GM.getEmptyGlass(ROWS_NUM, COLS_NUM),
            lastScore: prevState.score,
            lastSpeed: prevState.speed,
            speed: 1,
            score: 0,
            gameOver: true,
            pause: true,
          };
        } else {
          let { glass: newGlass, add_score } = GM.getClearedGlass(
            GM.putFigure(prevState.figure, prevState.glass)
          );

          setAction("");

          return {
            ...prevState,
            figure: prevState.nextFigure,
            nextFigure: GM.getNewFigure(COLS_NUM),
            glass: newGlass,
            score: prevState.score + add_score,
            speed: 1 + Math.floor((prevState.score + add_score) / 20),
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
        setAction("Rotate");
        break;
      case "ArrowDown":
        setAction("MoveDown");
        break;
      case "ArrowLeft":
        setAction("MoveLeft");
        break;
      case "ArrowRight":
        setAction("MoveRight");
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
      case "Rotate":
        moveFigure(0, 0, true);
        break;
      case "MoveDown":
        moveFigure(0, 1, false);
        break;
      case "MoveLeft":
        moveFigure(-1, 0, false);
        break;
      case "MoveRight":
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
    if (y > window.innerHeight * (1 - TOUCH_ZONE_SIZE_Y)) setAction("MoveDown");
    else if (y < window.innerHeight * TOUCH_ZONE_SIZE_Y) togglePause();
    else if (x < window.innerWidth * TOUCH_ZONE_SIZE_X) setAction("MoveLeft");
    else if (x > window.innerWidth * (1 - TOUCH_ZONE_SIZE_X))
      setAction("MoveRight");
    else setAction("Rotate");
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const clearAction = () => setAction("");
    window.addEventListener("keyup", clearAction);
    return () => {
      window.removeEventListener("keyup", clearAction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    makeAction();
    let interval = window.setInterval(() => makeAction(), SENSITIVITY);
    return () => {
      window.clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  React.useEffect(() => {
    let interval = window.setInterval(
      () => moveFigure(0, 1),
      1000 / state.speed
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
    const clearAction = () => setAction("");
    window.addEventListener("touchend", clearAction);
    return () => {
      window.removeEventListener("touchend", clearAction);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Glass
          glass={{
            rows: GM.putFigure(state.figure, state.glass),
            maxWidth: Math.min(window.innerWidth, window.screen.width),
            maxHight: Math.min(window.innerHeight, window.screen.height),
          }}
          pause={state.pause}
          gameOver={state.gameOver}
          score={state.score}
          speed={state.speed}
          previewGlass={{
            rows: GM.putFigure(
              { ...state.nextFigure, x: 0 },
              GM.getEmptyGlass(4, 3)
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
