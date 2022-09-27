import cloneDeep from "lodash.clonedeep";
import { gameConstants as GC } from "./constants";
import { Figure, CellData, RowData, Coordinates } from "./interfaces";

export class GameManipulations {
  private static last_row_id = Number.MIN_VALUE;

  private static getRandomColor(): string {
    return GC.colorsArr[Math.floor(Math.random() * GC.colorsArr.length)];
  }

  static getNewFigure(): Figure {
    const figNum: number = Math.floor(Math.random() * GC.figuresArr.length);
    const color: string = this.getRandomColor();
    return {
      ...GC.figuresArr[figNum],
      cells: GC.figuresArr[figNum].cells.map((cell) => ({
        ...cell,
        value: { ...cell.value, color: color } as CellData,
      })),
      figureCoordinates: { x: Math.floor((GC.cols - 2) / 2), y: 0 },
    };
  }

  static getEmptyRow(cols: number): RowData {
    const row: CellData[] = new Array<CellData>(cols).fill({
      isFilled: false,
      color: "#FFFFFF",
      cellSize: GC.cellSize,
    });
    const res = { id: this.last_row_id, cells: row };
    this.last_row_id++;
    return res;
  }

  protected static copyRow(row: RowData): RowData {
    return cloneDeep(row);
  }

  static getEmptyGlass(rows: number, cols: number): RowData[] {
    const result = [];
    for (let i = 0; i < rows; i++) {
      result.push(this.getEmptyRow(cols));
    }
    return result;
  }

  private static copyGlass(glass: RowData[]): RowData[] {
    return cloneDeep(glass);
  }

  protected static getRealCords(
    figure: Figure,
    cellIndex: number
  ): Coordinates {
    const result = {
      x: figure.figureCoordinates.x + figure.cells[cellIndex].relativeCoords.x,
      y: figure.figureCoordinates.y + figure.cells[cellIndex].relativeCoords.y,
    };
    return result;
  }

  static putFigure(figure: Figure, glass: RowData[]) {
    const newGlass = this.copyGlass(glass);
    for (let i = 0; i < figure.cells.length; i++) {
      const coords = this.getRealCords(figure, i);
      newGlass[coords.y].cells[coords.x] = {
        ...newGlass[coords.y].cells[coords.x],
        ...figure.cells[i].value,
      };
    }
    return newGlass;
  }
}
