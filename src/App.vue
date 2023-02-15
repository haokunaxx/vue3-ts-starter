<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {SvgIcon, EpIcon} from '@/components/Icon/index'
import { Share } from '@element-plus/icons'
</script>

<template>
  <div>
    <ElIcon :is-loading="true" :size="40" >
      <Share />
    </ElIcon>
    <EpIcon :is-loading="true" icon="Share" :size="40" color="#2c82fd"/>
    <SvgIcon :size="40" :spin="true" name="dynamic-avatar-1" />
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  padding: 1.5em;
  height: 6em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
