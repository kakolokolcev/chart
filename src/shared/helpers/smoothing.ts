const SMOOTH = 0.1;

type IPoints = number[];

type IConnectionPoint = {
  x: number;
  y: number;
  t: number;
};

const Vector = {
  add([ax, ay]: IPoints, [bx, by]: IPoints) {
    return [ax + bx, ay + by];
  },

  sub([ax, ay]: IPoints, [bx, by]: IPoints): IPoints {
    return [ax - bx, ay - by];
  },

  scale(s: number, [x, y]: IPoints): IPoints {
    return [s * x, s * y];
  },
};

export const smoothCommand = (i: number, a: IPoints[]) => {
  const pStart = a[i - 1];
  const pEnd = a[i];

  const pPrev = a[i - 2] || pStart;
  const pNext = a[i + 1] || pEnd;

  // start control point
  const [cpsX, cpsY] = Vector.add(pStart, Vector.scale(SMOOTH, Vector.sub(pEnd, pPrev)));
  // end control point
  const [cpeX, cpeY] = Vector.add(pEnd, Vector.scale(SMOOTH, Vector.sub(pStart, pNext)));

  return ` C ${cpsX},${cpsY} ${cpeX},${cpeY} ${pEnd[0]},${pEnd[1]}`;
};

export const getSmoothBezierPoints = (points: IPoints[]) => {
  let d = '';

  points.forEach((_, index) => {
    if (index) {
      d += smoothCommand(index, points);
    }
  });

  return d;
};

export const getSmoothedPoints = (a: IConnectionPoint[], i: number = 1) => {
  const pStart = a[i - 1];
  const pEnd = a[i];

  const pNext = a[i + 1] || pEnd;

  const [cpeX, cpeY] = Vector.add(
    [pEnd.x, pEnd.y],
    Vector.scale(SMOOTH, Vector.sub([pStart.x, pStart.y], [pNext.x, pNext.y])),
  );

  return { x: cpeX, y: cpeY, t: a[i].t };
};

export const useSmooth = () => {
  const smooth = (points: IConnectionPoint[]) => {
    const formatPoints = points.map((point) => {
      const { x, y, t } = point;

      return [x, y, t];
    });

    return getSmoothBezierPoints(formatPoints);
  };

  return { smooth };
};
