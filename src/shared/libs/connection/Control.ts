import { Point } from './Point';

type IPoint = {
  x: number;
  y: number;
  t: number;
};

export class Control extends Point {
  index: number;

  isSelected: boolean;

  constructor(points: IPoint, index: number) {
    super(points);

    this.index = index;
    this.isSelected = false;
  }

  select() {
    this.isSelected = true;
  }

  deselect() {
    this.isSelected = false;
  }

  setIndex(index: number) {
    this.index = index;
  }
}
