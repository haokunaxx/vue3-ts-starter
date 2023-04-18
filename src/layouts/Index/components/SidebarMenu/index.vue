<template>
  <div class="sidebar-menu-wrapper">
    <!-- <ElInput
      v-model="searchVal"
      v-if="!isPopMenu && mode === 'vertical'"
      style="display: none"
    /> -->
    <el-menu
      :collapse="props.collapse"
      :unique-opened="true"
      :mode="props.mode"
      @open="handleOpen"
      @close="handleClose"
      :default-active="route.fullPath"
    >
      <transition-group name="sidebar-menu">
        <Item
          v-for="item in sidebarMenuDataComputed"
          :key="item.path"
          :item="item"
          :iconSize="iconSize"
          :basicPath="basicPath"
          :direction="isPopMenu ? 'vertical' : 'horizontal'"
        />
      </transition-group>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useSettingsStore } from '@/store/settings'
import Item from './item.vue'
import { storeToRefs } from 'pinia'
interface Props {
  isPopMenu?: boolean //是否是弹出菜单，是的话图标垂直摆放
  iconSize?: number //图标大小
  collapse?: boolean
  mode?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<Props>(), {
  isPopMenu: false,
  collapse: false,
  mode: 'vertical',
  iconSize: 16
})

console.log('0---', props)

const route = useRoute()
const settingsStore = useSettingsStore()

// const searchVal = ref<string>()

const { popSidebarMenuData, sidebarMenuData } = storeToRefs(settingsStore)
const sidebarMenuDataComputed = computed(() => {
  if (props.isPopMenu) {
    //  popMenu
    return popSidebarMenuData.value
  }
  if (settingsStore.isMultiApplication) {
    //  多应用程序
    return sidebarMenuData.value.reduce((prev, next) => {
      prev.push(...(next.children || []))
      return prev
    }, [] as RouteRecordRaw[])
  } else {
    //  单一应用程序
    return sidebarMenuData.value
  }
})
console.log(
  props.isPopMenu,
  settingsStore.isMultiApplication,
  sidebarMenuDataComputed.value
)

// basicPath
const basicPath = computed(() => {
  // return settingsStore.isMultiApplication && !props.isPopMenu
  return settingsStore.isMultiApplication && !props.isPopMenu
    ? sidebarMenuData.value[0].path
    : ''
})
const handleOpen = () => {}
const handleClose = () => {}
</script>

<script lang="ts">
export default {
  name: 'SidebarMenu'
}
</script>

<style lang="scss" scoped>
@import '../../styles/index';

.sidebar-menu-wrapper {
  height: 100%;

  .el-menu {
    width: 100%;
    height: 100%;
  }
}

// 动画
.sidebar-menu-enter-active {
  // transition: all 0.3s ease;
  transition: 0.3s;
}

.sidebar-menu-enter-from,
.sidebar-menu-leave-active {
  opacity: 0;
  transform: translateY(30px) skewY(10deg);
}

.sidebar-menu-leave-active {
  position: absolute;
}

// 自定义sidebarMenu的样式
:deep {
  .el-menu {
    border-right: none;

    &--collapse {
      width: var(--el-menu-item-height);
    }

    &--horizontal {
      .el-sub-menu {
        .common-menu-item.column {
          color: unset;
          background-color: unset;
        }
      }
    }
  }

  .el-sub-menu {
    .common-menu-item.column {
      color: #fff;
      background-color: #20233a;
    }

    &.is-active {
      .common-menu-item.column {
        color: #20233a;
        background-color: #fff;
        border-radius: 6px;
      }
    }

    .el-menu {
      overflow: hidden;
      background-color: $sidebarMenuItemBg;
      border-radius: 6px;
    }

    .el-sub-menu__title:hover {
      overflow: hidden;
      background-color: transparent;
    }
  }
}
</style>

<style lang="scss">
@import '../../styles/index';
// sidebarMenu水平且popMenu时，选中的菜单项背景和字体颜色修改
.el-popper {
  .el-menu--horizontal {
    .el-menu-item.is-active {
      color: $lightTextColor;
      background-color: $sidebarMenuItemActive;

      &:hover {
        background-color: $sidebarMenuItemActive;
      }
    }
  }
}
</style>
