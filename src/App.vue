<template>
  <ElIcon iconName="Share" :isLoading="true" :size="20" color="#2c82fd" />
  <!-- <SvgIcon name="dynamic-avatar-1" :spin="true" :size="30" />
  <SvgIcon name="test-1" :size="30" /> -->
  <Icon :icon="icon" size="30" :spin="true" />
  <Icon icon="test-1|svg" size="30" :spin="true" />
  <Icon
    :useIconfont="true"
    size="30"
    prefix="#"
    icon="icon-user"
    :spin="true"
  />
</template>
<script setup lang="ts">
import { ElIcon } from '@/components/Icon'
import Icon from '@/components/Icon/src/Icon.vue'

const icon = ref('')
icon.value = 'ic:baseline-av-timer'
onMounted(() => {
  setTimeout(() => {
    icon.value = 'ic:baseline-games'
    console.log(icon)
  }, 3000)
})
</script>
