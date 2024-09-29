<template>
  <div
    :class="['control-point', { 'control-point--selected': control.isSelected }]"
    :style="{ top: `${coords.y}px`, left: `${coords.x}px` }"
  />
</template>

<script setup lang="ts">
import { type PropType, computed } from 'vue';

import { ConnectionControl } from '@/shared/libs/classes/ConnectionControl';
import { ChartStore } from '@/shared/libs';

const props = defineProps({
  control: {
    type: ConnectionControl,
    required: true,
  },
  mainNode: {
    type: Object as PropType<ChartStore.Node>,
    required: true,
  },
});

const coords = computed(() => {
  return {
    x: props.control.x - props.mainNode.points.x,
    y: props.control.y - props.mainNode.points.y,
  };
});
</script>

<style scoped lang="scss">
.control-point {
  position: absolute;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate3d(-50%, -50%, 0px);

  &:after {
    content: '';
    background-color: #868585;
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
</style>
