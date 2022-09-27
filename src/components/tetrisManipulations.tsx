import { Figure, RowData } from "./interfaces";
import { GameManipulations } from "./gameManipulations";

export class TetrisManipulations extends GameManipulations {
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
