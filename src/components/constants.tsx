import { CellProps } from "./cell";
import { adjustmentToScreenSize } from "./adjustmentToScreen";

export const TOUCH_ZONE_SIZE_X = 0.25;
export const TOUCH_ZONE_SIZE_Y = 0.2;
export const SENSITIVITY = 100;

export const COLS_NUM = 10;
export const ROWS_NUM = 20;

export enum Direction {
  "row",
  "column",
}
export const [CELL_SIZE, DIRECTION] = adjustmentToScreenSize(
  ROWS_NUM,
  COLS_NUM
);

export interface Figure {
  x0: number;
  y0: number;
  cells: {
    x: number;
    y: number;
    value: CellProps;
  }[];
  x?: number;
  y?: number;
}

export const figuresArr: Figure[] = [
  //  XX
  //  XX
  {
    x0: 0.5,
    y0: 0.5,
    cells: [
      { x: 0, y: 0, value: { isFilled: true, color: "#FF0000" } },
      { x: 1, y: 0, value: { isFilled: true, color: "#00FF00" } },
      { x: 0, y: 1, value: { isFilled: true, color: "#0000FF" } },
      { x: 1, y: 1, value: { isFilled: true, color: "#FF00FF" } },
    ],
  },
  // X
  // X
  // X
  // X
  {
    x0: 0,
    y0: 2,
    cells: [
      { x: 0, y: 0, value: { isFilled: true, color: "#FF0000" } },
      { x: 0, y: 1, value: { isFilled: true, color: "#00FF00" } },
      { x: 0, y: 2, value: { isFilled: true, color: "#0000FF" } },
      { x: 0, y: 3, value: { isFilled: true, color: "#FF00FF" } },
    ],
  },

  // XX
  // X
  // X
  {
    x0: 0,
    y0: 1,
    cells: [
      { x: 0, y: 0, value: { isFilled: true, color: "#FF0000" } },
      { x: 1, y: 0, value: { isFilled: true, color: "#00FF00" } },
      { x: 0, y: 1, value: { isFilled: true, color: "#0000FF" } },
      { x: 0, y: 2, value: { isFilled: true, color: "#FF00FF" } },
    ],
  },
  // XX
  //  X
  //  X
  {
    x0: 1,
    y0: 1,
    cells: [
      { x: 1, y: 0, value: { isFilled: true, color: "#FF0000" } },
      { x: 0, y: 0, value: { isFilled: true, color: "#00FF00" } },
      { x: 1, y: 1, value: { isFilled: true, color: "#0000FF" } },
      { x: 1, y: 2, value: { isFilled: true, color: "#FF00FF" } },
    ],
  },

  // XX
  //  XX

  {
    x0: 1,
    y0: 0,
    cells: [
      { x: 0, y: 0, value: { isFilled: true, color: "#FF0000" } },
      { x: 1, y: 0, value: { isFilled: true, color: "#00FF00" } },
      { x: 1, y: 1, value: { isFilled: true, color: "#0000FF" } },
      { x: 2, y: 1, value: { isFilled: true, color: "#FF00FF" } },
    ],
  },

  // XX
  //XX

  {
    x0: 1,
    y0: 1,
    cells: [
      { x: 1, y: 0, value: { isFilled: true, color: "#FF0000" } },
      { x: 2, y: 0, value: { isFilled: true, color: "#00FF00" } },
      { x: 0, y: 1, value: { isFilled: true, color: "#0000FF" } },
      { x: 1, y: 1, value: { isFilled: true, color: "#FF00FF" } },
    ],
  },

  //XXX
  // X

  {
    x0: 1,
    y0: 0,
    cells: [
      { x: 0, y: 0, value: { isFilled: true, color: "#FF0000" } },
      { x: 1, y: 0, value: { isFilled: true, color: "#00FF00" } },
      { x: 2, y: 0, value: { isFilled: true, color: "#0000FF" } },
      { x: 1, y: 1, value: { isFilled: true, color: "#FF00FF" } },
    ],
  },
];

export const colorsArr = [
  "#42e6f5",
  "#42c2f5",
  "#42aaf5",
  "#429cf5",
  "#4284f5",
];
