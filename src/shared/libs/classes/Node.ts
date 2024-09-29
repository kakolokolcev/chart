import { Point } from './Point';

export class Node {
  text: string;

  points: Point;

  constructor(x: number, y: number, text?: string) {
    this.points = new Point(x, y);
    this.text = text || '';
  }
}
