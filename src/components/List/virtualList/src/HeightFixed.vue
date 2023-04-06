<template>
  <div ref="containerRef" class="container">
    <div
      class="scroll-placeholder"
      :style="{
        height: placeholderHeight + 'px'
      }"
    ></div>
    <div
      class="virtual-scroll-list"
      :style="{
        transform: `translate3d(0,${offsetValue}px,0)`
      }"
    >
      <div
        v-for="item in displayListData"
        :key="item.id"
        :id="'' + item.id"
        ref="items"
        class="list-item"
        :style="{
          height: estimatedItemHeight + 'px'
        }"
      >
        <slot :item="item">{{ item.id }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEvent } from '@/hooks/useEvent'
interface Props {
  estimatedItemHeight?: number
  bufferPercent?: number
  originalListData: Record<string, any>
}

// interface ListItem {
//   id: number
//   value: string
// }

// const estimatedItemHeight = 50
// const bufferPercent = 0.5

const props = withDefaults(defineProps<Props>(), {
  bufferPercent: 0.5,
  estimatedItemHeight: 50
})
const { originalListData, bufferPercent, estimatedItemHeight } = toRefs(props)

// const originalListData = ref<ListItem[]>([])
const startIndex = ref<number>(0),
  endIndex = ref<number>(0)

const containerRef = ref<HTMLElement | null>(null),
  containerScrollHeight = ref<number>(0)

const count = ref<number>(0)

const placeholderHeight = ref<number>(0)

const offsetValue = ref<number>(0)

const displayListData = computed(() => {
  return originalListData.value.slice(
    startIndexWithBuffer.value,
    endIndexWithBuffer.value
  )
})

const bufferCount = computed(() => {
  return (bufferPercent.value * count.value) >> 0
})

const aboveCount = computed(() => {
  return Math.min(startIndex.value, bufferCount.value)
})

const belowCount = computed(() => {
  return Math.min(
    bufferCount.value,
    originalListData.value.length - endIndex.value
  )
})

const startIndexWithBuffer = computed(() => {
  return startIndex.value - aboveCount.value
})

const endIndexWithBuffer = computed(() => {
  return endIndex.value + belowCount.value
})

// 目的是使列表在容器滚动时始终保持在中间
const getCurrentOffset = () => {
  //滚动的值 等于 进入项/出去项的高度时 校准位置
  if (startIndex.value > bufferCount.value) {
    return (
      startIndex.value * estimatedItemHeight.value -
      bufferCount.value * estimatedItemHeight.value
    )
  } else {
    return 0
  }
}

// originalListData.value = Array.from(
//   {
//     length: 1000
//   },
//   (_, idx) => {
//     return {
//       id: idx,
//       // value: idx + '字符内容'.repeat(Math.random() * 20)
//       value: idx + '字符内容'.repeat(6)
//     }
//   }
// )

const scrollEvent = (e: Event) => {
  const target = e.target as HTMLElement,
    scrollTop = target.scrollTop
  startIndex.value = Math.floor(scrollTop / estimatedItemHeight.value)
  endIndex.value = startIndex.value + count.value
  offsetValue.value = getCurrentOffset()
}

const initData = (scrollHeight) => {
  const _container = containerRef.value
  if (!_container) return
  // const sh = _container.scrollHeight
  containerScrollHeight.value = scrollHeight
  count.value = Math.ceil(scrollHeight / estimatedItemHeight.value)
  endIndex.value = startIndex.value + count.value
  placeholderHeight.value =
    estimatedItemHeight.value * originalListData.value.length
}

// const initEvent = () => {
//   const _container = containerRef.value
//   if (!_container) return
//   _container.addEventListener('scroll', scrollEvent)
// }

onMounted(() => {
  const containerEl = containerRef.value
  if (!containerEl) return
  initData(containerEl.scrollHeight)
  useEvent(containerEl, 'scroll', scrollEvent, false)
})
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  overflow: auto;
  width: 300px;
  height: 600px;
  border: 1px solid #000;
}

.scroll-placeholder {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.virtual-scroll-list {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.list-item {
  border-bottom: 1px solid #000;
  box-sizing: border-box;
}
</style>
