<template>
  <div class="editor-wrapper">
    <!-- <svg
      height="100%"
      width="100%"
    >
      <Connection :points="createConnectionCoords({ x: 820, y: 200 }, { x: 1220, y: 200 })" />
    </svg> -->

    <div
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
      class="layout"
    >
      <div class="layout-chart">
        <Node :node="{ text: '', point: { x: 700, y: 200 }}" />
      </div>
<!-- 
      <div
        v-for="circle in currentConnection.controls"
        :key="circle.index"
        :class="['path-center', { 'path-center--selected': circle.isSelected }]"
        @mousedown="onMouseDown(circle.index)"
        :style="{ top: `${circle.y}px`, left: `${circle.x}px` }"
      />

      <div
        class="create-node-btn"
        @click="createNode"
      /> -->

      C 320.8337,0.0000 305.8894,-164.4119 311.6606,-164.4119
        317.4319 -164.4119 343.9185 0.0000 452.0000 0.0000 
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useConnection } from '@/entities/connection';
import { Node } from '@/entities/node';

import { Connection, useConnectionCoords } from '@/shared/ui';
import { useSmooth } from '@/shared/helpers';

const toRightDefaultConnection = [
  { x: 400, y: 100, t: 0 },
  { x: 650, y: 100, t: 0.5 },
  { x: 900, y: 100, t: 1 },
];

const defaultNode = {
  text: 'Нажмите, чтобы изменить заголовок',
  point: {
    x: 0,
    y: 0,
  },
};

const { connections, create, throttleRecalculatePoints, selectControlPoint, deselectControlPoint } =
  useConnection();
const { smooth } = useSmooth();
const { createConnectionCoords } = useConnectionCoords();

const chart = ref({
  nodes: [],
  connections,
});

create(toRightDefaultConnection);

const currentConnection = connections.value[0];

const smoothedString = computed(() => smooth(currentConnection.points));

const onMouseMove = (e: MouseEvent) => {
  const { movementX, movementY } = e;

  throttleRecalculatePoints(movementX, movementY);
};

const onMouseUp = () => {
  deselectControlPoint();
};
const onMouseDown = (index: number) => {
  selectControlPoint(index, currentConnection.id);
};

const createNode = () => {
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;

  // @ts-ignore
  chart.value.nodes.push({
    text: 'Нажмите, чтобы изменить заголовок',
    point: {
      x,
      y,
    },
  });

  console.log(chart);
};
</script>

<style lang="scss">
.editor-wrapper {
  height: 100dvh;
  width: 100dvw;
  overflow: hidden;
  position: relative;

  .create-node-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    height: 40px;
    width: 40px;
    border-radius: 100%;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;

    &:after {
      content: '+';
    }
  }

  .layout {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }

  .path-center {
    position: absolute;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate3d(-50%, -50%, 0px);

    &:after {
      content: '';
      background-color: red;
      height: 10px;
      width: 10px;
      opacity: 0.5;
      border-radius: 100%;
      cursor: grab;
    }

    &--selected {
      &:after {
        opacity: 1;
      }
    }
  }
}
</style>
