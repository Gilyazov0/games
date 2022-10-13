import { adjustmentToScreenSize } from "./adjustmentToScreen";
import { Apps } from "../dataTypes/gameDataTypes";
import { SnakeGameParameters } from "../dataTypes/snakeDataTypes";
import { TetrisGameParameters } from "../dataTypes/tetrisDataTypes";
import { LifeGameParameters } from "../dataTypes/lifeDataTypes";
export function setParameters(game: Apps): void {
  switch (game) {
    case Apps.tetris: {
      const [cellSize, direction] = adjustmentToScreenSize(20, 10);
      gamesParameters = {
        touchZoneSizeX: 0.25,
        touchZoneSizeY: 0.2,
        changeSpeedCoef: 20,
        sensitivity: 100,
        rows: 20,
        cols: 10,
        baseSpeed: 1000,
        cellSize: cellSize,
        direction: direction,
        colorsArr: ["#42e6f5", "#42c2f5", "#42aaf5", "#429cf5", "#4284f5"],
        figuresArr: [
          //  XX
          //  XX
          {
            rotationPoint: {
              x: 0.5,
              y: 0.5,
            },
            cells: [
              {
                relativeCoords: { x: 0, y: 0 },
                value: { isFilled: true, color: "#FF0000" },
              },
              {
                relativeCoords: { x: 1, y: 0 },
                value: { isFilled: true, color: "#00FF00" },
              },
              {
                relativeCoords: { x: 0, y: 1 },
                value: { isFilled: true, color: "#0000FF" },
              },
              {
                relativeCoords: { x: 1, y: 1 },
                value: { isFilled: true, color: "#FF00FF" },
              },
            ],
          },
          // X
          // X
          // X
          // X
          {
            rotationPoint: {
              x: 0,
              y: 2,
            },
            cells: [
              {
                relativeCoords: { x: 0, y: 0 },
                value: { isFilled: true, color: "#FF0000" },
              },
              {
                relativeCoords: { x: 0, y: 1 },
                value: { isFilled: true, color: "#00FF00" },
              },
              {
                relativeCoords: { x: 0, y: 2 },
                value: { isFilled: true, color: "#0000FF" },
              },
              {
                relativeCoords: { x: 0, y: 3 },
                value: { isFilled: true, color: "#FF00FF" },
              },
            ],
          },

          // XX
          // X
          // X
          {
            rotationPoint: { x: 0, y: 1 },
            cells: [
              {
                relativeCoords: { x: 0, y: 0 },
                value: { isFilled: true, color: "#FF0000" },
              },
              {
                relativeCoords: { x: 1, y: 0 },
                value: { isFilled: true, color: "#00FF00" },
              },
              {
                relativeCoords: { x: 0, y: 1 },
                value: { isFilled: true, color: "#0000FF" },
              },
              {
                relativeCoords: { x: 0, y: 2 },
                value: { isFilled: true, color: "#FF00FF" },
              },
            ],
          },
          // XX
          //  X
          //  X
          {
            rotationPoint: { x: 1, y: 1 },
            cells: [
              {
                relativeCoords: { x: 1, y: 0 },
                value: { isFilled: true, color: "#FF0000" },
              },
              {
                relativeCoords: { x: 0, y: 0 },
                value: { isFilled: true, color: "#00FF00" },
              },
              {
                relativeCoords: { x: 1, y: 1 },
                value: { isFilled: true, color: "#0000FF" },
              },
              {
                relativeCoords: { x: 1, y: 2 },
                value: { isFilled: true, color: "#FF00FF" },
              },
            ],
          },

          // XX
          //  XX

          {
            rotationPoint: { x: 1, y: 0 },

            cells: [
              {
                relativeCoords: { x: 0, y: 0 },
                value: { isFilled: true, color: "#FF0000" },
              },
              {
                relativeCoords: { x: 1, y: 0 },
                value: { isFilled: true, color: "#00FF00" },
              },
              {
                relativeCoords: { x: 1, y: 1 },
                value: { isFilled: true, color: "#0000FF" },
              },
              {
                relativeCoords: { x: 2, y: 1 },
                value: { isFilled: true, color: "#FF00FF" },
              },
            ],
          },

          // XX
          //XX

          {
            rotationPoint: { x: 1, y: 1 },

            cells: [
              {
                relativeCoords: { x: 1, y: 0 },
                value: { isFilled: true, color: "#FF0000" },
              },
              {
                relativeCoords: { x: 2, y: 0 },
                value: { isFilled: true, color: "#00FF00" },
              },
              {
                relativeCoords: { x: 0, y: 1 },
                value: { isFilled: true, color: "#0000FF" },
              },
              {
                relativeCoords: { x: 1, y: 1 },
                value: { isFilled: true, color: "#FF00FF" },
              },
            ],
          },

          //XXX
          // X

          {
            rotationPoint: { x: 1, y: 0 },

            cells: [
              {
                relativeCoords: { x: 0, y: 0 },
                value: { isFilled: true, color: "#FF0000" },
              },
              {
                relativeCoords: { x: 1, y: 0 },
                value: { isFilled: true, color: "#00FF00" },
              },
              {
                relativeCoords: { x: 2, y: 0 },
                value: { isFilled: true, color: "#0000FF" },
              },
              {
                relativeCoords: { x: 1, y: 1 },
                value: { isFilled: true, color: "#FF00FF" },
              },
            ],
          },
        ],
      } as TetrisGameParameters;
      break;
    }

    case Apps.snake: {
      let rows = 20;
      let cols = 10;
      if (window.screen.width > window.screen.height && rows > cols) {
        [rows, cols] = [cols, rows];
      } else if (window.screen.width < window.screen.height && rows < cols) {
        [rows, cols] = [cols, rows];
      }

      const [cellSize, direction] = adjustmentToScreenSize(rows, cols);

      gamesParameters = {
        touchZoneSizeX: 0.25,
        touchZoneSizeY: 0.2,
        changeSpeedCoef: 10,
        rows: rows,
        cols: cols,
        baseSpeed: 800,
        cellSize: cellSize,
        direction: direction,
        colorsArr: [],
        applesCount: 5,
        figuresArr: [
          //  XX
          {
            rotationPoint: {
              x: 0,
              y: 0,
            },
            cells: [
              {
                relativeCoords: { x: 0, y: 0 },
                value: { isFilled: true, color: "#FFFFFF" },
              },
              {
                relativeCoords: { x: 1, y: 0 },
                value: { isFilled: true, color: "#00FF00" },
              },
              {
                relativeCoords: { x: 2, y: 0 },
                value: { isFilled: true, color: "#00FF00" },
              },
              {
                relativeCoords: { x: 3, y: 0 },
                value: { isFilled: true, color: "#00FF00" },
              },
            ],
          },
        ],
      } as SnakeGameParameters;

      break;
    }

    case Apps.life: {
      let rows = 40;
      let cols = 30;
      if (window.screen.width > window.screen.height && rows > cols) {
        [rows, cols] = [cols, rows];
      } else if (window.screen.width < window.screen.height && rows < cols) {
        [rows, cols] = [cols, rows];
      }

      const [cellSize, direction] = adjustmentToScreenSize(rows, cols);

      gamesParameters = {
        touchZoneSizeX: 0.25,
        touchZoneSizeY: 0.2,
        changeSpeedCoef: 10,
        rows: rows,
        cols: cols,
        baseSpeed: 800,
        cellSize: cellSize,
        direction: direction,
        colorsArr: [],
        applesCount: 5,
        figuresArr: [
          //  XX
          {
            rotationPoint: {
              x: 0,
              y: 0,
            },
            cells: [
              {
                relativeCoords: { x: 0, y: 0 },
                value: { isFilled: true, color: "#FFFFFF" },
              },
              {
                relativeCoords: { x: 1, y: 0 },
                value: { isFilled: true, color: "#00FF00" },
              },
              {
                relativeCoords: { x: 2, y: 0 },
                value: { isFilled: true, color: "#00FF00" },
              },
              {
                relativeCoords: { x: 3, y: 0 },
                value: { isFilled: true, color: "#00FF00" },
              },
            ],
          },
        ],
      } as SnakeGameParameters;

      break;
    }
  }
}

export let gamesParameters:
  | TetrisGameParameters
  | SnakeGameParameters
  | LifeGameParameters;
