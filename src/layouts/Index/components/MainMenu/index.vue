<template>
  <div class="main-menu-wrapper">
    <Application v-if="!props.isPopMenu" position="side" />
    <SidebarMenu v-else v-bind="bindingValue" />
  </div>
</template>

<script setup lang="ts">
import Application from '../Application/applicationList.vue'
import SidebarMenu from '../SidebarMenu/index.vue'
interface Props {
  isPopMenu?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isPopMenu: false
})

const bindingValue = computed(() => {
  return {
    iconSize: 24,
    collapse: true,
    isPopMenu: props.isPopMenu
  }
})
</script>

<style lang="scss" scoped>
.main-menu-wrapper {
  width: 68px;
  height: 100%;
  background-color: #20233a;

  :deep(.el-menu) {
    width: 100%;
    height: 100%;
    background-color: #20233a;

    .el-sub-menu__title {
      padding: 6px;
      height: 68px;
    }
  }
}
</style>

<style lang="scss">
.el-popper {
  .el-menu--vertical {
    .el-menu {
      // 重置popMenu的选中项的父级高亮
      .el-sub-menu.is-active {
        & > .el-sub-menu__title {
          .common-menu-item,
          .el-icon.el-sub-menu__icon-arrow {
            color: var(--el-menu-active-color);
          }
        }
      }
    }
  }
}
</style>
