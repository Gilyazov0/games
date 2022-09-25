import "./App.css";
import { Glass, RowData } from "./components/glass";
import React from "react";
import cloneDeep from "lodash.clonedeep";
//import shortid from "shortid";
import {
  figuresArr,
  colorsArr,
  TOUCH_ZONE_SIZE_X,
  SENSITIVITY,
  TOUCH_ZONE_SIZE_Y,
  Figure,
  CELL_SIZE,
  ROWS_NUM,
  COLS_NUM,
} from "./components/constants";
import { CellProps } from "./components/cell";

let last_row_id = Number.MIN_VALUE;

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
  function getRandomColor(): string {
    return colorsArr[Math.floor(Math.random() * colorsArr.length)];
  }

  function getNewFigure(cols: number): Figure {
    const figNum: number = Math.floor(Math.random() * figuresArr.length);
    const color: string = getRandomColor();
    return {
      ...figuresArr[figNum],
      cells: figuresArr[figNum].cells.map((cell) => ({
        ...cell,
        value: { ...cell.value, color: color },
      })),
      x: Math.floor((cols - 2) / 2),
      y: 0,
    };
  }

  function getEmptyRow(cols: number): RowData {
    const row: CellProps[] = new Array<CellProps>(cols).fill({
      isFilled: false,
      color: "#FFFFFF",
      cellSize: CELL_SIZE,
    });
    const res = { id: last_row_id, row: { cells: row } };
    last_row_id++;
    return res;
  }

  function copyRow(row: RowData): RowData {
    return cloneDeep(row);
  }

  function getEmptyGlass(rows: number, cols: number): RowData[] {
    const result = [];
    for (let i = 0; i < rows; i++) {
      result.push(getEmptyRow(cols));
    }
    return result;
  }

  function copyGlass(glass: RowData[]): RowData[] {
    return cloneDeep(glass);
  }

  function getRealCords(figure: Figure, cellIndex: number) {
    const result = {
      x: figure.x! + figure.cells[cellIndex].x,
      y: figure.y! + figure.cells[cellIndex].y,
    };
    return result;
  }

  function getMovedFigure(
    figure: Figure,
    dx: number,
    dy: number,
    rotate: boolean
  ): Figure {
    let newCells = figure.cells;
    const x0 = figure.x0;
    const y0 = figure.y0;
    if (rotate) {
      newCells = [];
      for (let i = 0; i < figure.cells.length; i++) {
        newCells.push({
          ...figure.cells[i],
          x: x0 - (figure.cells[i].y - y0),
          y: y0 + (figure.cells[i].x - x0),
        });
      }
    }

    return {
      ...figure,
      x: figure.x! + dx,
      y: figure.y! + dy,
      cells: newCells,
    };
  }

  function putFigure(figure: Figure, glass: RowData[]) {
    const newGlass = copyGlass(glass);

    for (let i = 0; i < figure.cells.length; i++) {
      const coords = getRealCords(figure, i);
      newGlass[coords.y].row.cells[coords.x] = {
        ...newGlass[coords.y].row.cells[coords.x],
        ...figure.cells[i].value,
      };
    }
    return newGlass;
  }

  function isValidPosition(figure: Figure, glass: RowData[]): boolean {
    for (let i = 0; i < figure.cells.length; i++) {
      const coords = getRealCords(figure, i);
      if (coords.y < 0 || coords.y > glass.length - 1) return false;
      if (coords.x < 0 || coords.x > glass[0].row.cells.length - 1)
        return false;
      if (glass[coords.y].row.cells[coords.x].isFilled === true) return false;
    }
    return true;
  }

  function getClearedGlass(glass: RowData[]): {
    glass: RowData[];
    add_score: number;
  } {
    let add_score = 0;
    const newGlass = [];
    for (let i = 0; i < glass.length; i++) {
      if (!glass[i].row.cells.every((cell) => cell.isFilled === true)) {
        newGlass.push(copyRow(glass[i]));
      } else {
        newGlass.unshift(getEmptyRow(glass[i].row.cells.length));
        add_score += 1;
      }
    }
    return { glass: newGlass, add_score: add_score };
  }

  const [state, setState] = React.useState<GameState>({
    glass: getEmptyGlass(ROWS_NUM, COLS_NUM),
    figure: getNewFigure(COLS_NUM),
    nextFigure: getNewFigure(COLS_NUM),
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
      const newFigure = getMovedFigure(prevState.figure, dx, dy, rotate);
      if (isValidPosition(newFigure, prevState.glass))
        return {
          ...prevState,
          figure: newFigure,
        };
      else if (dy > 0) {
        if (prevState.figure.y === 0) {
          return {
            ...prevState,
            figure: prevState.nextFigure,
            nextFigure: getNewFigure(COLS_NUM),
            glass: getEmptyGlass(ROWS_NUM, COLS_NUM),
            lastScore: prevState.score,
            lastSpeed: prevState.speed,
            speed: 1,
            score: 0,
            gameOver: true,
            pause: true,
          };
        } else {
          let { glass: newGlass, add_score } = getClearedGlass(
            putFigure(prevState.figure, prevState.glass)
          );

          setAction("");

          return {
            ...prevState,
            figure: prevState.nextFigure,
            nextFigure: getNewFigure(COLS_NUM),
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
            rows: putFigure(state.figure, state.glass),
            maxWidth: Math.min(window.innerWidth, window.screen.width),
            maxHight: Math.min(window.innerHeight, window.screen.height),
          }}
          pause={state.pause}
          gameOver={state.gameOver}
          score={state.score}
          speed={state.speed}
          previewGlass={{
            rows: putFigure({ ...state.nextFigure, x: 0 }, getEmptyGlass(4, 3)),
            maxHight: 1,
            maxWidth: 1,
          }}
        />
      </header>
    </div>
  );
};

export default App;
