<template>
  <div class="sub-menu-wrapper">
    <SidebarMenu :collapse="props.collapse" :is-pop-menu="false" />
  </div>
</template>

<script setup lang="ts">
import SidebarMenu from '../SidebarMenu/index.vue'
interface Props {
  collapse?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  collapse: false
})
</script>

<style lang="scss" scoped>
.sub-menu-wrapper {
  overflow: hidden;
  padding: 0 6px;
  width: 240px;
  height: 100%;
  background-color: #fff;
  box-shadow: 10px 0 10px -10px rgb(0 0 0 / 30%);
  transition: width 0.3s ease;
}
</style>
