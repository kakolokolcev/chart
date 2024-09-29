export interface IPoint {
  x: number;
  y: number;
  t?: number;
}

export interface IConnectionPoints {
  tailPoints: {
    x: number;
    y: number;
  };
  points: {
    x: number;
    y: number;
    t: number;
  }[];
  headPoints: {
    x: number;
    y: number;
  };
}
