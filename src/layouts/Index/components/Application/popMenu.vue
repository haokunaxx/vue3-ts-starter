<template>
  <SidebarMenu
    :isPopMenu="true"
    :iconSize="24"
    :collapse="true"
    :mode="props.position === 'side' ? 'vertical' : 'horizontal'"
  />
</template>

<script setup lang="ts">
import SidebarMenu from '../SidebarMenu/index.vue'
interface Props {
  position?: 'header' | 'side'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'side'
})
</script>
