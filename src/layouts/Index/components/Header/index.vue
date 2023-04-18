<template>
  <div class="layout-header-wrapper">
    <div class="header-left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div
      :class="['header-middle', isPopMenu && 'pop-menu']"
      :style="{ height: headerHeight }"
    >
      <!-- 顶部应用程序 -->
      <Application
        v-if="isApplication && !isPopMenu"
        v-bind="applicationBindingValue"
      />
      <!-- 顶部导航菜单 -->
      <SidebarMenu v-else v-bind="sidebarMenuBindingValue" />
    </div>
    <div class="header-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Application from '../Application/applicationList.vue'
import SidebarMenu from '../SidebarMenu/index.vue'
interface Props {
  isApplication: boolean //是应用程序列表
  isMenu: boolean //是导航菜单
  isPopMenu: boolean //是弹出菜单
}

const props = defineProps<Props>()
const { isApplication, isMenu, isPopMenu } = toRefs(props)

const sidebarMenuBindingValue = computed<{
  isPopMenu?: boolean
  iconSize?: number
  collapse?: boolean
  mode?: 'horizontal' | 'vertical'
}>(() => {
  if (isPopMenu.value) {
    return {
      isPopMenu: true,
      iconSize: 24,
      collapse: false,
      mode: 'horizontal'
    }
  }
  if (isMenu.value) {
    return {
      mode: 'horizontal',
      isPopMenu: false
    }
  } else {
    return {}
  }
})

const applicationBindingValue = computed<{
  position?: 'header' | 'side'
}>(() => {
  return isApplication.value
    ? {
        position: 'header'
      }
    : {}
})

const headerHeight = computed(() => {
  // return isMenu ? (isPopMenu.value ? '68px' : '56px') : '68px'
  return '68px'
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixins';

.layout-header-wrapper {
  @include flex-r;

  overflow: hidden;
  width: 100%;
  height: 68px;
  background-color: #20233a;

  & > div {
    height: 100%;
  }

  .header-middle {
    flex: 1;

    .sidebar-menu-wrapper {
      width: 100%;
    }
  }

  .header-left {
    width: 100px;
    background-color: skyblue;
  }

  .header-right {
    width: 300px;
    background-color: pink;
  }
}

// 重置headerPopMenu样式
:deep(.header-middle.pop-menu) {
  background-color: #20233a;

  .el-menu {
    background-color: #20233a;

    .el-sub-menu {
      color: #fff;

      &.is-active {
        .el-sub-menu__title {
          .common-menu-item {
            background-color: #fff;
          }
        }
      }

      .el-sub-menu__title {
        padding: 6px;
        width: 68px;
        height: 68px;
        color: #fff;
        border: none;

        .el-icon.el-sub-menu__icon-arrow {
          display: none;
        }
      }
    }
  }
}
</style>
