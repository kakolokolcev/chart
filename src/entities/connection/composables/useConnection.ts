import { ref } from 'vue';

import { throttle } from '@/shared/helpers';
import { Connection } from '@/shared/libs';

type IPoint = {
  x: number;
  y: number;
  t: number;
};

export const useConnection = () => {
  const connections = ref<Connection[]>([]);

  let selectedControlIndex: number | null = null;
  let selectedConnection: Connection | null = null;

  const create = (points: IPoint[]) => {
    connections.value.push(new Connection(points));
  };

  const recalculatePoints = (deltaX: number, deltaY: number) => {
    if (selectedConnection && selectedControlIndex) {
      const { newIndex } = selectedConnection.recalculate(selectedControlIndex, deltaX, deltaY);

      selectedControlIndex = newIndex;
    }
  };

  const selectControlPoint = (index: number, connectionId: number) => {
    selectedControlIndex = index;

    selectedConnection = connections.value.find(({ id }) => id === connectionId) || null;

    if (!selectedConnection) {
      return;
    }

    selectedConnection.selectControlPoint(index);
  };

  const deselectControlPoint = () => {
    if (selectedConnection && selectedControlIndex) {
      selectedConnection.deselectControlPoint(selectedControlIndex);

      selectedConnection.clearSettings();
    }

    selectedConnection = null;
    selectedControlIndex = null;
  };

  const throttleRecalculatePoints = throttle(recalculatePoints, 10);

  return {
    connections,
    create,
    recalculatePoints,
    selectControlPoint,
    deselectControlPoint,
    throttleRecalculatePoints,
  };
};
