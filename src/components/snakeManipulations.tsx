import { GameManipulations } from "./gameManipulations";
import { Coordinates, Figure, RowData } from "./interfaces";
import { gameConstants as GC } from "./constants";
import cloneDeep from "lodash.clonedeep";

export class SnakeManipulations extends GameManipulations {
  static getNewFigure(): Figure {
    return {
      ...super.getNewFigure(),
      figureCoordinates: {
        x: Math.floor(GC.cols / 2),
        y: Math.floor(GC.rows / 2),
      },
    };
  }

  static putFood(figure: Figure): RowData[] {
    const field = this.getEmptyGlass(GC.rows, GC.cols);
    let isValid = false;
    while (!isValid) {
      isValid = true;
      const row = Math.floor(Math.random() * GC.rows);
      const col = Math.floor(Math.random() * GC.cols);
      for (let i = 0; i < figure.cells.length; i++) {
        const cellCoords = this.getRealCords(figure, i);
        if (row === cellCoords.y && col === cellCoords.x) isValid = false;
      }
      if (isValid) {
        field[row].cells[col] = {
          color: "#a3122d",
          isFilled: true,
          cellSize: GC.cellSize,
        };
        return field;
      }
    }
    return field;
  }

  static isFood(coords: Coordinates, field: RowData[]): boolean {
    return field[coords.y].cells[coords.x].isFilled;
  }

  static getMovedFigure(
    figure: Figure,
    dx: number,
    dy: number,
    field: RowData[]
  ): Figure {
    if (dx === 0 && dy === 0) return figure;
    let newCells = cloneDeep(figure.cells);
    let prevCoords = this.getRealCords(figure, 0);
    const newFigureCoords: Coordinates = {
      x: figure.figureCoordinates.x + dx,
      y: figure.figureCoordinates.y + dy,
    };

    for (let i = 1; i < newCells.length; i++) {
      const temp = this.getRealCords(figure, i);
      newCells[i].relativeCoords = {
        x: prevCoords.x - newFigureCoords.x,
        y: prevCoords.y - newFigureCoords.y,
      };
      prevCoords = temp;
    }

    if (this.isFood(newFigureCoords, field)) {
      const newCell = cloneDeep(newCells[newCells.length - 1]);
      newCell.relativeCoords = {
        x: prevCoords.x - newFigureCoords.x,
        y: prevCoords.y - newFigureCoords.y,
      };
      newCells.push(newCell);
    }

    return {
      ...figure,
      figureCoordinates: newFigureCoords,
      cells: newCells,
    };
  }

  static isValidPosition(oldFigure: Figure, coords: Coordinates): boolean {
    if (
      coords.x < 0 ||
      coords.y < 0 ||
      coords.x >= GC.cols ||
      coords.y >= GC.rows
    )
      return false;

    for (let i = 0; i < oldFigure.cells.length; i++) {
      if (
        JSON.stringify(this.getRealCords(oldFigure, i)) ===
        JSON.stringify(coords)
      )
        return false;
    }
    return true;
  }
}
