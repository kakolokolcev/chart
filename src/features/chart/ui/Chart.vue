<template>
  <div class="chart">
    <teleport to="#div-layout">
      <MainNode
        :node="chart.mainNode"
        @create-right="ChartStore.createNode(ECreateNodeTypes.right)"
      />

      <template v-for="connection in chart.connections">
        <ControlPoint
          v-for="control, index in connection.points"
          :key="control"
          :control="{ ...control, isSelected: false }"
          :main-node="chart.mainNode"
        />
      </template>

      <template v-for="connection in chart.connections">
        <ControlPoint
          v-for="control in connection.controls"
          :key="control.index"
          :control="control"
          :main-node="chart.mainNode"
          @mousedown="$emit('onMouseDownControl', control.index, connection.id)"
        />
      </template>
    </teleport>

    <teleport to="#svg-layout">
      <Connection
        v-for="connection in chart.connections"
        :key="connection.id"
        :points="connection"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

import { MainNode } from '@/entities/node';
import { ControlPoint } from '@/entities/connection';

import { ChartStore } from '@/shared/libs';
import { Connection } from '@/shared/ui';

enum ECreateNodeTypes {
  right = 'right',
}

defineProps({
  chart: {
    type: Object as PropType<ChartStore.Chart>,
    required: true,
  },
});

const onMouseDown = (index: number, connectionId: number) => {
  selectControlPoint(index, connectionId);
};
</script>

<style scoped lang="scss">
.chart {

}
</style>
