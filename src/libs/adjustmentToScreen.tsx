import { Direction } from "../dataTypes/gameDataTypes";

export function adjustmentToScreenSize(
  rowsCount: number,
  colsCount: number
): [number, Direction] {
  let maxWidth = Math.min(window.innerWidth, window.screen.width);
  let maxHight = Math.min(window.innerHeight, window.screen.height);
  const margin = 210;

  let cellSizeByRows = (maxHight - margin) / rowsCount;
  let cellSizeByCols = (maxWidth - margin) / colsCount;

  const direction: Direction =
    cellSizeByRows > cellSizeByCols ? Direction.column : Direction.row;
  // const addCols = direction === Direction.column ? 0 : 3;
  // const addRows = direction === Direction.row ? 0 : 4;

  if (direction === Direction.column) {
    maxHight -= 210;
  } else {
    maxWidth -= 210;
  }

  cellSizeByRows = maxHight / rowsCount;
  cellSizeByCols = maxWidth / colsCount;

  let cellSize = Math.min(cellSizeByRows, cellSizeByCols);
  cellSize = Math.floor(cellSize) - 2;
  return [cellSize, direction];
}
