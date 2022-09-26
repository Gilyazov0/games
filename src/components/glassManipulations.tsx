import cloneDeep from "lodash.clonedeep";
import { gameConstants as GC } from "./constants";
import { Figure, CellData, RowData } from "./interfaces";

export class GlassManipulations {
  private static last_row_id = Number.MIN_VALUE;

  private static getRandomColor(): string {
    return GC.colorsArr[Math.floor(Math.random() * GC.colorsArr.length)];
  }

  static getNewFigure(cols: number): Figure {
    const figNum: number = Math.floor(Math.random() * GC.figuresArr.length);
    const color: string = this.getRandomColor();
    return {
      ...GC.figuresArr[figNum],
      cells: GC.figuresArr[figNum].cells.map((cell) => ({
        ...cell,
        value: { ...cell.value, color: color } as CellData,
      })),
      figureCoordinates: { x: Math.floor((cols - 2) / 2), y: 0 },
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

  private static copyRow(row: RowData): RowData {
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

  private static getRealCords(figure: Figure, cellIndex: number) {
    const result = {
      x: figure.figureCoordinates.x! + figure.cells[cellIndex].relativeCoords.x,
      y: figure.figureCoordinates.y! + figure.cells[cellIndex].relativeCoords.y,
    };
    return result;
  }

  static getMovedFigure(
    figure: Figure,
    dx: number,
    dy: number,
    rotate: boolean
  ): Figure {
    let newCells = figure.cells;
    const x0 = figure.rotationPoint.x;
    const y0 = figure.rotationPoint.y;
    if (rotate) {
      newCells = [];
      for (let i = 0; i < figure.cells.length; i++) {
        newCells.push({
          ...figure.cells[i],
          relativeCoords: {
            x: x0 - (figure.cells[i].relativeCoords.y - y0),
            y: y0 + (figure.cells[i].relativeCoords.x - x0),
          },
        });
      }
    }

    return {
      ...figure,
      figureCoordinates: {
        x: figure.figureCoordinates.x + dx,
        y: figure.figureCoordinates.y + dy,
      },
      cells: newCells,
    };
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

  static isValidPosition(figure: Figure, glass: RowData[]): boolean {
    for (let i = 0; i < figure.cells.length; i++) {
      const coords = this.getRealCords(figure, i);
      if (coords.y < 0 || coords.y > glass.length - 1) return false;
      if (coords.x < 0 || coords.x > glass[0].cells.length - 1) return false;
      if (glass[coords.y].cells[coords.x].isFilled === true) return false;
    }
    return true;
  }

  static getClearedGlass(glass: RowData[]): {
    glass: RowData[];
    add_score: number;
  } {
    let add_score = 0;
    const newGlass = [];
    for (let i = 0; i < glass.length; i++) {
      if (!glass[i].cells.every((cell) => cell.isFilled === true)) {
        newGlass.push(this.copyRow(glass[i]));
      } else {
        newGlass.unshift(this.getEmptyRow(glass[i].cells.length));
        add_score += 1;
      }
    }
    return { glass: newGlass, add_score: add_score };
  }
}
