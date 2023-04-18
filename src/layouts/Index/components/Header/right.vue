<template>
  <div class="header-right-wrapper">
    <Icon icon="ic:round-settings" />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@/components/Icon/index'
</script>

<style lang="scss" scoped>
// @import '../../styles/index';
@import '@/styles/mixins';

.header-right-wrapper {
  @include vh-center();

  overflow: hidden;
  width: 100px;
  height: 100%;
  color: #fff;
}
</style>
