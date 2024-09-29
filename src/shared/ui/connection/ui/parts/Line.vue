<template>
  <path
    ref="pathRef"
    fill="transparent"
    stroke="#9ed56b"
    :stroke-width="Consts.strokeWidth"
    :d="`M ${coords[0].x} ${coords[0].y} ${smoothedString}`"
  />
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';

import { Types, Consts } from '../../model';

import { useSmooth } from '@/shared/helpers';

const { smooth } = useSmooth();

type IPointWithT = Types.IPoint & { t: number };

const props = defineProps({
  coords: {
    type: Array as PropType<IPointWithT[]>,
    default: () => [],
  },
});

const smoothedString = computed(() => smooth(props.coords));
// const smoothedString = computed(() => {
//   let str = 'C ';

//   props.coords.forEach((item) => {
//     str += `${item.x},${item.y} `;
//   });

//   return str;
// });
</script>
