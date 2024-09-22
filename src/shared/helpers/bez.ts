export const useBize = () => {
  const getX = (xT: number, x0: number, x2: number, t = 0.5) => {
    return (xT - (1 - t) ** 2 * x0 - t ** 2 * x2) / (2 * (1 - t) * t);
  };

  const getY = (yT: number, y0: number, y2: number, t = 0.5) => {
    return (yT - (1 - t) ** 2 * y0 - t ** 2 * y2) / (2 * (1 - t) * t);
  };

  const getCenterTX = (x0: number, x1: number, x2: number, t = 0.5) => {
    return (1 - t) ** 2 * x0 + 2 * (1 - t) * t * x1 + t ** 2 * x2;
  };

  const getCenterTY = (y0: number, y1: number, y2: number, t = 0.5) => {
    return (1 - t) ** 2 * y0 + 2 * (1 - t) * t * y1 + t ** 2 * y2;
  };

  return { getX, getY, getCenterTX, getCenterTY };
};
