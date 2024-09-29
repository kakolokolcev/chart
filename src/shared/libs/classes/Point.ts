export class Point {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  change(deltaX: number, deltaY: number) {
    this.x += deltaX;
    this.y += deltaY;
  }

  setCoordinates(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
