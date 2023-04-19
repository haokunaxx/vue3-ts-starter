<template>
  <transition-group mode="out-in" name="pop" class="list" tag="ul">
    <!-- enter-active-class="animate__animated animate__slideInRight" -->
    <!-- leave-active-class="animate__animated animate__slideOutRight" -->
    <!-- <div key="displayText">{{ displayText }}</div> -->
    <li
      class="list-item"
      v-for="(item, index) in outputArr"
      :key="item + index"
    >
      {{ item }}
    </li>
  </transition-group>

  <!-- <transition name="pop">
    <p>{{ displayText }}</p>
  </transition> -->
  <ElButton @click="stop">stop</ElButton>
  <ElButton @click="continueTyping">restart</ElButton>
</template>
<script setup lang="ts">
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

import { useTyped } from '@/hooks/typed'

const { outputArr, stop, continueTyping } = useTyped(
  '拿钱买快乐拿钱买快乐拿钱买快乐',
  {
    delay: 100,
    mode: 'alternate',
    immediate: true,
    step: 1
  }
)

// const displayText = computed(() => outputArr.value.join(''))
</script>

<style lang="scss">
.list {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;

  &-item {
    // position: absolute;
    padding: 0;
    margin: 0;
  }
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.1s ease;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
