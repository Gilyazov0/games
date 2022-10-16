import { Direction } from "../dataTypes/gameDataTypes";

export function adjustmentToScreenSize(
  rowsCount: number,
  colsCount: number,
  infoSize: number
): [number, Direction] {
  let maxWidth = Math.min(window.innerWidth, window.screen.width);
  let maxHight = Math.min(window.innerHeight, window.screen.height);
  const margin =
    parseFloat(getComputedStyle(document.documentElement).fontSize) * infoSize;

  let cellSizeByRows = (maxHight - margin) / rowsCount;
  let cellSizeByCols = (maxWidth - margin) / colsCount;

  const direction: Direction =
    cellSizeByRows > cellSizeByCols ? Direction.column : Direction.row;

  if (direction === Direction.column) {
    maxHight -= margin;
  } else {
    maxWidth -= margin;
  }

  cellSizeByRows = maxHight / rowsCount;
  cellSizeByCols = maxWidth / colsCount;

  let cellSize = Math.min(cellSizeByRows, cellSizeByCols);
  cellSize = Math.floor(cellSize) - 2;
  return [cellSize, direction];
}
