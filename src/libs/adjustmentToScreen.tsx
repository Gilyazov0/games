import { Direction } from "../dataTypes/gameDataTypes";

export function adjustmentToScreenSize(
  rowsCount: number,
  colsCount: number
): [number, Direction] {
  const maxWidth = Math.min(window.innerWidth, window.screen.width);
  const maxHight = Math.min(window.innerHeight, window.screen.height);
  const margin = 15;

  let cellSizeByRows = (maxHight - margin) / rowsCount;
  let cellSizeByCols = (maxWidth - margin) / colsCount;

  const direction: Direction =
    cellSizeByRows > cellSizeByCols ? Direction.column : Direction.row;
  const addCols = direction === Direction.column ? 0 : 3;
  const addRows = direction === Direction.row ? 0 : 4;

  cellSizeByRows = (maxHight - margin) / (rowsCount + addRows);
  cellSizeByCols = (maxWidth - margin) / (colsCount + addCols);

  let cellSize = Math.min(cellSizeByRows, cellSizeByCols);
  cellSize = Math.floor(cellSize) - 2;
  return [cellSize, direction];
}
