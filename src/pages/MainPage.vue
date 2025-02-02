<template>
  <div class="editor-wrapper">
    <svg
      height="100%"
      width="100%"
    >
      <path
        ref="pathRef"
        fill="transparent"
        stroke="#988ee3"
        stroke-width="10px"
        :d="`M 400 100 ${smoothedString}`"
      />
    </svg>

    <div
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
      class="layout"
    >
      <div
        v-for="circle in currentConnection.controls"
        :key="circle.index"
        :class="['path-center', { 'path-center--selected': circle.isSelected }]"
        @mousedown="onMouseDown(circle.index)"
        :style="{ top: `${circle.y}px`, left: `${circle.x}px` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useConnection } from '@/entities/connection';

import { useSmooth } from '@/shared/helpers';

const toRightDefaultConnection = [
  { x: 400, y: 100, t: 0 },
  { x: 650, y: 100, t: 0.5 },
  { x: 900, y: 100, t: 1 },
];

const { connections, create, throttleRecalculatePoints, selectControlPoint, deselectControlPoint } =
  useConnection();
const { smooth } = useSmooth();

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
</script>

<style lang="scss">
.editor-wrapper {
  height: 100dvh;
  width: 100dvw;
  overflow: hidden;
  position: relative;

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
