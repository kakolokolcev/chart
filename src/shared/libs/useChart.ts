import { ref } from 'vue';

import { throttle } from '@/shared/helpers';

import { Node } from './classes/Node';
import { Chart } from './classes/Chart';
import { Connection } from './classes/Connection';

const useChart = () => {
  const chart = ref<Chart | null>(null);

  let selectedControlIndex: number | null = null;
  let selectedConnection: Connection | null = null;

  const create = () => {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;

    chart.value = new Chart(x, y);
  };

  const createNode = (a: any) => {
    const mainNode = document.getElementById('main-node');

    if (!mainNode) {
      return;
    }

    const { x, y, right } = mainNode.getBoundingClientRect();

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    if (a === 'right') {
      startX = right;
      startY = y + mainNode.clientHeight / 2;

      endX = startX + 300;
      endY = startY;
    }

    chart.value?.createNode({ x: startX, y: startY }, { x: endX, y: endY });
    // mainNode?.clientWidth
  };

  const recalculatePoints = (deltaX: number, deltaY: number) => {
    if (selectedConnection && selectedControlIndex) {
      const { newIndex } = selectedConnection.recalculate(selectedControlIndex, deltaX, deltaY);

      selectedControlIndex = newIndex;
    }
  };

  const selectControlPoint = (index: number, connectionId: number) => {
    selectedControlIndex = index;

    selectedConnection = chart.value?.connections.find(({ id }) => id === connectionId) || null;

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

  return { chart, create, createNode, selectControlPoint, throttleRecalculatePoints, deselectControlPoint };
};

const { chart, create, createNode, selectControlPoint, throttleRecalculatePoints, deselectControlPoint } = useChart();

export { chart, create, createNode, selectControlPoint, throttleRecalculatePoints, deselectControlPoint, type Chart, type Node };
