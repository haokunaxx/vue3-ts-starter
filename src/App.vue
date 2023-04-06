<template>
  <!-- <ElIcon iconName="Share" :isLoading="true" :size="20" color="#2c82fd" /> -->
  <!-- <SvgIcon name="dynamic-avatar-1" :spin="true" :size="30" />
  <SvgIcon name="test-1" :size="30" /> -->
  <!-- <Icon :icon="icon" size="30" :spin="true" />
  <Icon icon="test-1|svg" size="30" :spin="true" />
  <Icon
    :useIconfont="true"
    size="30"
    prefix="#"
    icon="icon-user"
    :spin="true"
  /> -->
  <!-- <List1 /> -->
  <!-- <TestList />
  <List2 /> -->
  <!-- <div style="display: flex">
    <VirtualListDemo1 />
    <VirtualListDemo2 />
  </div> -->
  <LazyList />
</template>
<script setup lang="ts">
// virualListDemo
// import { VirtualListDemo1 } from '@/views/demo/list/virtualList/Index'
// import { VirtualListDemo2 } from '@/views/demo/list/virtualList/HeightFixed'

import LazyList from '@/views/demo/list/lazyList/index.vue'
// const listShow = ref(true)

// import List1 from '@/views/demo/list/lazyList/lazyList1.vue'
// import List2 from '@/views/demo/list/lazyList/optimizedList1.vue'
// import TestList from '@/components/List/vituralList/test.vue'
// import { ElIcon } from '@/components/Icon'
// import Icon from '@/components/Icon/src/Icon.vue'

// const icon = ref('')
// icon.value = 'ic:baseline-av-timer'
// onMounted(() => {
//   setTimeout(() => {
//     icon.value = 'ic:baseline-games'
//     console.log(icon)
//   }, 3000)
// })
</script>
