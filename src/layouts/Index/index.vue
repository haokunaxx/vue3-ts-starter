<!-- 
  布局模式：
  一：左1应用程序 - 左2导航菜单 - 右内容区（mode-left）
  二：左导航菜单 - 右内容区(mode-none)
  三：左边应用程序（导航菜单popover）右边内容区(mode-left-pop)
  四：上应用程序（导航菜单popover）下方内容区(mode-top-pop)
  五：上方头部显示应用程序 - 下方（左导航菜单 和 右内容区 ）(mode-top-left)
  六：上导航菜单 下（左应用程序 右内容 ）（mode-left-top）
 -->

<template>
  <div class="layout-container">
    <transition name="height-to-zero">
      <Header
        v-if="headerApplicationShow || headerMenuShow"
        :is-application="headerApplicationShow"
        :is-menu="headerMenuShow"
        :is-pop-menu="applicationIsPopMenu"
      />
    </transition>
    <div class="main-container">
      <!-- 左侧应用程序 -->
      <transition name="width-to-zero">
        <MainMenu v-if="applicationShow" :is-pop-menu="applicationIsPopMenu" />
      </transition>

      <!-- 左侧导航菜单 -->
      <transition name="width-to-zero">
        <SubMenu v-if="sidebarShow" :collapse="applicationIsPopMenu" />
      </transition>
      <!-- 内容区 -->
      <div class="content-container">
        <ElButton
          v-for="(layout, key) in layouts"
          :key="key"
          @click="changeLayout(layout.mode)"
          >{{ key }}</ElButton
        >
        <router-view />
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import Header from './components/Header/index.vue'
import MainMenu from './components/MainMenu/index.vue'
import SubMenu from './components/SubMenu/index.vue'
import { useLayout } from '@/hooks/settings/useLayout'
const {
  headerApplicationShow,
  headerMenuShow,
  applicationShow,
  sidebarShow,
  layouts,
  applicationIsPopMenu,
  changeLayout
} = useLayout()
</script>

<style lang="scss" scoped>
@import './styles/index';

.layout-container {
  height: 100%;

  .main-container {
    display: flex;
    width: 100%;
    height: 100%;
    background-color: #f2f3f5;

    .content-container {
      flex: 1;
    }
  }
}

// .hide {
//   height: 0;
// }

// .application-container {
//   overflow: hidden;
//   width: 68px;
//   height: 100%;
// }

// .sidebar-container {
//   overflow: hidden;
//   padding: 0 6px;
//   width: 200px;
//   height: 100%;
//   background-color: #fff;
//   box-shadow: 10px 0 10px -10px rgb(0 0 0 / 30%);
// }

// .sub-menu-enter-from,
// .sub-menu-leave-to {
//   overflow: hidden;
//   padding: 0;
//   width: 0;
// }

.sub-menu-leave-active,
.sub-menu-enter-active {
  transition: width 0.3s ease;
}

@include widthToZero();
@include heightToZero();
</style>
