<template>
  <div class="application-list-wrapper">
    <template v-if="position === 'side'">
      <!-- logo -->
    </template>
    <ul
      :class="[
        'application-list',
        props.position === 'header' ? 'horizontal' : ''
      ]"
    >
      <li
        v-for="(application, index) in applicationList"
        :key="index"
        :class="[
          'application-list-item',
          activeApplication === index && 'active'
        ]"
        @click="toggleApplication(index)"
      >
        <Title
          :active="activeApplication === index"
          :icon="application.icon"
          :iconSize="24"
          :title="application.title"
          direction="vertical"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Title from '../SidebarMenu/title.vue'
import { useSettingsStore } from '@/store/settings'
interface Props {
  position?: 'header' | 'side'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'side'
})

const settingsStore = useSettingsStore()
const { applicationList, activeApplication } = storeToRefs(settingsStore)
const toggleApplication = (index: number) => {
  settingsStore.toggleApplication(index)
}
</script>

<style lang="scss" scoped>
@import '../../styles/index';

.application-list-wrapper {
  .application-list {
    display: flex;
    flex-direction: column;

    &.horizontal {
      flex-direction: row;
    }

    &-item {
      box-sizing: border-box;
      padding: $applicationItemPadding;
      width: $applicationItemWidth;
      height: $applicationItemHeight;
      color: $applicationItemTextColor;
    }
  }
}
</style>
