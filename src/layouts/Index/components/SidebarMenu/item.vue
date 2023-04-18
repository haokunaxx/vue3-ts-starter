<template>
  <el-sub-menu v-if="hasChildren" :index="itemPath">
    <template #title>
      <Title
        :direction="direction"
        :title="meta?.title"
        :icon="meta?.icon"
        :icon-size="iconSize"
      />
    </template>
    <SidebarItem
      v-for="child in children"
      :item="child"
      :key="child.path"
      :basic-path="itemPath"
    />
  </el-sub-menu>
  <Link v-else :route="itemPath">
    <el-menu-item :index="itemPath">
      <Title :title="meta?.title" :icon="meta?.icon" :icon-size="iconSize" />
    </el-menu-item>
  </Link>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import Link from './link.vue'
import Title from './title.vue'
const props = defineProps<{
  basicPath: string
  item: RouteRecordRaw
  direction?: 'vertical' | 'horizontal'
  iconSize?: number
}>()

const { item } = toRefs(props),
  { path, children } = item.value

const meta: {
  title?: string
  icon?: string
} = item.value.meta || {}

const hasChildren = children?.length ?? false

const itemPath = `${props.basicPath ? props.basicPath + '/' : ''}${path}`
</script>

<script lang="ts">
export default {
  name: 'SidebarItem'
}
</script>

<style lang="scss" scoped>
@import '../../styles/index';

:deep(.el-menu-item) {
  &.is-active {
    color: $lightTextColor;
    background-color: $sidebarMenuItemActive;
  }

  &:hover {
    background-color: $sidebarMenuItemHoverBg;
  }

  &.is-active:hover {
    background-color: $sidebarMenuItemActive;
  }
}
</style>
