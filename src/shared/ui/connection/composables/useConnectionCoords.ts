import { Types, Consts } from '../model';

import { useSmooth } from '@/shared/helpers';

const { smooth } = useSmooth();

export const useConnectionCoords = () => {
  const createDefaultRightLineCoords = (start: Types.IPoint, end: Types.IPoint) => {
    return [
      {
        x: start.x,
        y: start.y,
        t: 0,
      },
      {
        x: Math.max(start.x, end.x) - Math.abs(start.x - end.x) * 0.6,
        y: Math.max(start.y, end.y) - Math.abs(start.y - end.y) * 0.6,
        t: 0.6,
      },
      {
        x: Math.max(start.x, end.x) - Math.abs(start.x - end.x) * 0.5,
        y: Math.max(start.y, end.y) - Math.abs(start.y - end.y) * 0.5,
        t: 0.5,
      },
      {
        x: Math.max(start.x, end.x) - Math.abs(start.x - end.x) * 0.4,
        y: Math.max(start.y, end.y) - Math.abs(start.y - end.y) * 0.4,
        t: 0.4,
      },
      {
        x: end.x,
        y: end.y,
        t: 1,
      },
    ];
  };

  const createConnectionCoords = (start: Types.IPoint, end: Types.IPoint): Types.IConnectionPoints => {
    const startX = start.x + Consts.offsetFromNode;
    const endX = end.x - Consts.offsetFromNode;

    return {
      tailPoints: {
        x: startX,
        y: start.y,
      },
      points: createDefaultRightLineCoords({ x: startX + Consts.width, y: start.y }, { x: endX - Consts.width, y: end.y }),
      headPoints: {
        x: endX - Consts.width,
        y: end.y,
      },
    };
  };

  return { createConnectionCoords };
};
