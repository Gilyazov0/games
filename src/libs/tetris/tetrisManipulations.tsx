import { Figure, RowData } from "../../dataTypes/gameFieldDataTypes";
import { GameManipulations } from "../gameManipulations";

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

  static isValidPosition(figure: Figure, field: RowData[]): boolean {
    for (let i = 0; i < figure.cells.length; i++) {
      const coords = this.getRealCords(figure, i);
      if (coords.y < 0 || coords.y > field.length - 1) return false;
      if (coords.x < 0 || coords.x > field[0].cells.length - 1) return false;
      if (field[coords.y].cells[coords.x].isFilled === true) return false;
    }
    return true;
  }

  static getClearedField(field: RowData[]): {
    field: RowData[];
    add_score: number;
  } {
    let add_score = 0;
    const newField = [];
    for (let i = 0; i < field.length; i++) {
      if (!field[i].cells.every((cell) => cell.isFilled === true)) {
        newField.push(this.copyRow(field[i]));
      } else {
        newField.unshift(this.getEmptyRow(field[i].cells.length));
        add_score += 1;
      }
    }
    return { field: newField, add_score: add_score };
  }
}
