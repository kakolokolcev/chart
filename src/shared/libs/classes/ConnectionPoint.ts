import { useSmooth } from '@/shared/helpers';

const getVectorDistance = (a: number[], b: number[]) => {
  const [x1, y1] = a;
  const [x2, y2] = b;

  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

export class ConnectionPoint {
  x: number;

  y: number;

  t: number;

  constructor({ x, y, t }: { x: number; y: number; t: number }) {
    this.x = x;
    this.y = y;
    this.t = t;
  }

  change(deltaX: number, deltaY: number) {
    this.x += deltaX;
    this.y += deltaY;
  }

  setCoordinates({ x, y, t }: { x: number; y: number; t: number }) {
    this.x = x;
    this.y = y;
    this.t = t;
  }

  distanceBetween(other: ConnectionPoint) {
    return getVectorDistance([other.x, other.y], [this.x, this.y]);
  }

  getMiddleCoordinates(other: ConnectionPoint) {
    const x = (this.x + other.x) / 2;
    const y = (this.y + other.y) / 2;
    // TODO Проверить норм ли везде t
    const t = this.t / 2;

    return { x, y, t };
  }

  getMiddleCoordinatesW(other: ConnectionPoint) {
    const x = (this.x + other.x) / 2;
    const y = (this.y + other.y) / 2;
    // TODO Проверить норм ли везде t
    const t = this.t / 2;
    // const points = useSmooth().smooth([other, this, { x, y, t }]);
    // debugger;
    return { x, y, t };
  }

  // getMiddleCoordinatesW(a: any, b: any) {
  //   const x = (this.x + other.x) / 2;
  //   const y = (this.y + other.y) / 2;
  //   // TODO Проверить норм ли везде t
  //   const t = this.t / 2;
  //   const s = a[0];
  //   const m = a[1];
  //   const e = a[2];
  //   const res = smoothOne(s, m, e);
  //   debugger;

  //   return { x, y, t };
  // }
}
