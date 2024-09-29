<template>
  <div
    class="workspace"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
  >
    <DivLayout />
    <SvgLayout />

    <Chart
      v-if="ChartStore.chart.value"
      :chart="ChartStore.chart.value"
      @onMouseDownControl="onMouseDown"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { Chart } from '@/features/chart';
import { SvgLayout } from '@/features/svg-layout';
import { DivLayout } from '@/features/div-layout';

import { ChartStore } from '@/shared/libs';

onMounted(() => {
  ChartStore.create();
});

const onMouseDown = (index: number, connectionId: number) => {
  ChartStore.selectControlPoint(index, connectionId);

};

const onMouseMove = (e: MouseEvent) => {
  const { movementX, movementY } = e;

  ChartStore.throttleRecalculatePoints(movementX, movementY);
};

const onMouseUp = () => {
  ChartStore.deselectControlPoint();
};
</script>

<style scoped lang="scss">
.workspace {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
