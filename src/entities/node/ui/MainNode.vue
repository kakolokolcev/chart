<template>
  <div class="main-node-wrapper">
    <div
      id="main-node"
      class="main-node"
    >
      <div class="main-node__title">
        {{ node.text }}
      </div>

      <div class="main-node__right-arrow">
        <div
          class="main-node__create-connection"
          @click="$emit('createRight')"
        />
      </div>
      <div class="main-node__left-arrow" />
      <div class="main-node__top-arrow" />
      <div class="main-node__bottom-arrow" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

import { ChartStore } from '@/shared/libs';

defineProps({
  node: {
    type: Object as PropType<ChartStore.Node>,
    default: () => ({}),
  },
});

defineEmits(['createRight']);
</script>

<style scoped lang="scss">
.main-node-wrapper {
  padding: 20px;
  position: absolute;
  transform: translate3d(-50%, -50%, 0px);

  .main-node {
    position: relative;
    font-size: 17px;
    background-color: #cecece;
    padding: 5px 15px;
    color: #c1c1c1;
    border-radius: 3px;
    height: 40px;
    box-sizing: border-box;
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;

    &__create-connection {
      display: none;
      position: absolute;
      left: 50%;
      top: 50%;
      background-color: #cecece;
      height: 20px;
      width: 20px;
      border-radius: 100%;
      transform: translate(-50%, -50%);
      border: 1px solid black;
      z-index: 1;

      &:after {
        content: '+';
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        cursor: pointer;
      }
    }

    &__right-arrow,
    &__left-arrow,
    &__top-arrow,
    &__bottom-arrow {
      position: absolute;

      &:after {
        content: '';
        display: block;
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 8px 0 8px 10px;
        border-color: transparent transparent transparent #cecece;
      }
    }

    &__right-arrow,
    &__left-arrow {
      top: 50%;
      transform: translate(0, -50%);
    }

    &__right-arrow {
      right: -9px;

      &:after {
        transform: rotate(0deg);
      }
    }

    &__left-arrow {
      left: -9px;

      &:after {
        transform: rotate(180deg);
      }
    }

    &__top-arrow,
    &__bottom-arrow {
      left: 50%;
      transform: translate(-50%, 0);
    }

    &__top-arrow {
      top: -12px;

      &:after {
        transform: rotate(-90deg);
      }
    }

    &__bottom-arrow {
      bottom: -12px;

      &:after {
        transform: rotate(90deg);
      }
    }
  }

  &:hover {
    .main-node {
      &__create-connection {
        display: block;
      }
    }
  }
}
</style>
