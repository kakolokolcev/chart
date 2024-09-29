<template>
  <path
    :d="`
      M ${coords.x} ${coords.y - Consts.height / 2}
      ${coords.x + Consts.width} ${coords.y}
      ${coords.x} ${coords.y + Consts.height / 2}
      ${coords.x} ${coords.y}
    `"
    fill="#9ed56b"
    stroke="none"
  />
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

import { Types, Consts } from '../../model';

defineProps({
  coords: {
    type: Object as PropType<Types.IPoint>,
    default: () => ({}),
  },
});
</script>
