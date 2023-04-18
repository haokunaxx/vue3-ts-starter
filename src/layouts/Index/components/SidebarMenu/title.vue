<template>
  <div
    :class="['common-menu-item', isVertical && 'column', active && 'active']"
  >
    <p class="common-menu-item-icon">
      <Icon :icon="icon" v-if="icon" :size="iconSize" />
    </p>
    <p :class="['common-menu-item-text', isVertical && 'sm-text']">
      <span>{{ title }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@/components/Icon/index'
interface Props {
  direction?: 'vertical' | 'horizontal'
  active?: boolean
  title?: string
  icon?: string
  iconSize?: number
}
const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  title: '',
  boolean: false,
  iconSize: 16
})
const { direction, icon, title } = toRefs(props)

const isVertical = computed(() => direction.value === 'vertical')
</script>

<style lang="scss" scoped>
@import '@/styles/mixins';
@import '../../styles/index';

.common-menu-item {
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  cursor: pointer;
  @include vh-center;

  &.active {
    color: $applicationItemBg;
    background-color: $applicationItemActiveBg;
    cursor: not-allowed;
  }

  &.column {
    @include vh-center(column);
  }

  &-icon {
    @include vh-center;

    margin-right: 12px;
  }

  &.column &-icon {
    margin: 0 0 6px;
  }

  &-text {
    @include ellipse;

    &.sm-text {
      font-size: 12px;
      line-height: 12px;
    }
  }
}
</style>
