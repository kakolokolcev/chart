<template>
  <g class="connection">
    <Start :coords="points.tailPoints" />

    <Line :coords="points.points" />

    <End :coords="points.headPoints" />
  </g>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

import { Types } from '../model';

// import { useSmooth } from '@/shared/helpers';

import Start from './parts/Start.vue';
import Line from './parts/Line.vue';
import End from './parts/End.vue';

const props = defineProps({
  points: {
    type: Object as PropType<Types.IConnectionPoints>,
    default: () => ({}),
  },
});
console.log(props.points);
</script>

<style scoped lang="scss">
.connection {
}
</style>
