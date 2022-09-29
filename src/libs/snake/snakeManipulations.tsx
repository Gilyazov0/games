import { GameManipulations } from "../gameManipulations";
import { Coordinates, Figure, RowData } from "../interfaces";
import { gameConstants as GC } from "../сonstants";
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

  static putFood(
    figure: Figure,
    quantity: number,
    field: RowData[]
  ): RowData[] {
    const newField = this.copyField(field);
    let count = 0;
    while (count < quantity) {
      let isValid = false;
      while (!isValid) {
        isValid = true;
        const row = Math.floor(Math.random() * GC.rows);
        const col = Math.floor(Math.random() * GC.cols);

        for (let i = 0; i < figure.cells.length; i++) {
          const cellCoords = this.getRealCords(figure, i);
          if (row === cellCoords.y && col === cellCoords.x) {
            isValid = false;
            continue;
          }
        }

        isValid = isValid && !newField[row].cells[col].isFilled;

        if (isValid) {
          newField[row].cells[col] = {
            color: "#a3122d",
            isFilled: true,
            cellSize: GC.cellSize,
          };
          count++;
        }
      }
    }
    return newField;
  }

  static isFood(coords: Coordinates, field: RowData[]): boolean {
    if (!this.isInsideField(coords, GC.rows, GC.cols)) return false;
    return field[coords.y].cells[coords.x].isFilled;
  }

  static colorSnake(figure: Figure) {
    const gradient = Math.floor(200 / figure.cells.length);
    for (let i = 0; i < figure.cells.length; i++) {
      figure.cells[i].value.color = `rgb(0,${55 + i * gradient},0)`;
    }
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
    const newFigure = {
      ...figure,
      figureCoordinates: newFigureCoords,
      cells: newCells,
    };
    this.colorSnake(newFigure);

    return newFigure;
  }

  static isValidPosition(oldFigure: Figure, coords: Coordinates): boolean {
    if (!this.isInsideField(coords, GC.rows, GC.cols)) return false;

    for (let i = 0; i < oldFigure.cells.length - 1; i++) {
      if (
        JSON.stringify(this.getRealCords(oldFigure, i)) ===
        JSON.stringify(coords)
      )
        return false;
    }
    return true;
  }
}
