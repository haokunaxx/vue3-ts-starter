<template>
  <div class="layout-container">
    <transition name="height-to-zero">
      <Header
        v-if="headerShow"
        :is-application="isHeaderApplication"
        :is-menu="isHeaderMenu"
        :is-pop-menu="isPopMenu"
      >
        <template #right>
          <HeaderRight />
        </template>
      </Header>
    </transition>
    <div class="main-container">
      <!-- 左侧应用程序 -->
      <transition name="width-to-zero">
        <MainMenu v-if="mainMenuShow" :is-pop-menu="isPopMenu" />
      </transition>

      <!-- 左侧导航菜单 -->
      <transition name="width-to-zero">
        <SubMenu v-if="subMenuShow" :collapse="isPopMenu" />
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
</template>

<script setup lang="ts">
import Header from './components/Header/index.vue'
import HeaderRight from './components/Header/right.vue'
import MainMenu from './components/MainMenu/index.vue'
import SubMenu from './components/SubMenu/index.vue'
import { useLayout } from '@/hooks/settings/useLayout'
const {
  layouts,
  headerShow,
  isHeaderApplication,
  isHeaderMenu,
  mainMenuShow,
  subMenuShow,
  isPopMenu,
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

@include widthToZero();
@include heightToZero();
</style>
