import { adjustmentToScreenSize } from "./AdjustmentToScreen";
import { GameConstants } from "./Interfaces";
import { Apps } from "./Interfaces";
export function setConstants(game: Apps): void {
  switch (game) {
    case Apps.tetris: {
      const [cellSize, direction] = adjustmentToScreenSize(20, 10);
      gameConstants = {
        touchZoneSizeX: 0.25,
        touchZoneSizeY: 0.2,
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
      };
      break;
    }

    case Apps.snake: {
      const [cellSize, direction] = adjustmentToScreenSize(20, 20);
      gameConstants = {
        touchZoneSizeX: 0.25,
        touchZoneSizeY: 0.2,
        sensitivity: 100,
        rows: 20,
        cols: 20,
        baseSpeed: 800,
        cellSize: cellSize,
        direction: direction,
        colorsArr: ["rgb(0,200,0)"],
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
      };
      break;
    }
  }
}

export let gameConstants: GameConstants;
