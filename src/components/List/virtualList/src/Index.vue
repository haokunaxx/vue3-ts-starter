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
        :key="item.virtualListItemIndex"
        :id="'' + item.id"
        ref="listItemsRef"
        class="list-item"
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

interface PositionItem {
  id: number
  top: number
  bottom: number
  height: number
}

const binarySearch = function (list, target) {
  const len = list.length
  let left = 0,
    right = len - 1
  let tempIndex: number | null = null

  while (left <= right) {
    let midIndex = (left + right) >> 1
    let midVal = list[midIndex].bottom

    if (midVal === target) {
      return midIndex
    } else if (midVal < target) {
      left = midIndex + 1
    } else {
      // list不一定存在与target相等的项，不断收缩右区间，寻找最匹配的项
      if (tempIndex === null || tempIndex > midIndex) {
        tempIndex = midIndex
      }
      right--
    }
  }
  // 如果没有搜索到完全匹配的项 就返回最匹配的项
  return tempIndex
}
const props = withDefaults(defineProps<Props>(), {
  bufferPercent: 0.5,
  estimatedItemHeight: 50
})
const { originalListData, bufferPercent, estimatedItemHeight } = toRefs(props)

const startIndex = ref<number>(0),
  endIndex = ref<number>(0)

const containerRef = ref<HTMLElement | null>(null),
  listItemsRef = ref<HTMLElement[] | null>(null),
  containerScrollHeight = ref<number>(0)

const count = ref<number>(0)

const placeholderHeight = ref<number>(0)

const offsetValue = ref<number>(0)

const positions = ref<PositionItem[]>([])

const displayListData = computed(() => {
  return originalListData.value.slice(
    startIndexWithBuffer.value,
    endIndexWithBuffer.value
  )
})

// 缓存项的个数
const bufferCount = computed(() => {
  return (bufferPercent.value * count.value) >> 0
})

// 显示区域之前的缓存项个数
const aboveCount = computed(() => {
  return Math.min(startIndex.value, bufferCount.value)
})

// 显示区域之后的缓冲项个数
const belowCount = computed(() => {
  return Math.min(
    bufferCount.value,
    originalListData.value.length - endIndex.value
  )
})

// 渲染的列表数据 开始项的索引（缓冲项计算在内）
const startIndexWithBuffer = computed(() => {
  return startIndex.value - aboveCount.value
})

// 渲染的列表数据 末尾项的索引（缓冲项计算在内）
const endIndexWithBuffer = computed(() => {
  return endIndex.value + belowCount.value
})

// 目的是使列表在容器滚动时始终保持在中间
const getCurrentOffset = () => {
  //滚动的值 等于 进入项/出去项的高度时 校准位置
  if (startIndex.value >= bufferCount.value) {
    const bufferSize =
      positions.value[startIndex.value].top -
      positions.value[startIndex.value - aboveCount.value].top
    return positions.value[startIndex.value].top - bufferSize
  } else {
    return 0
  }
}

// 获取开始项的索引
const getStartIndex = (scrollTop: number) => {
  // return positions.value.findIndex((item) => scrollTop <= item.bottom)
  return binarySearch(positions.value, scrollTop)
}

// 滚动事件
const scrollEvent = (e: Event) => {
  const target = e.target as HTMLElement,
    scrollTop = target.scrollTop
  // startIndex.value = Math.floor(scrollTop / estimatedItemHeight)
  startIndex.value = getStartIndex(scrollTop) as number
  endIndex.value = startIndex.value + count.value

  offsetValue.value = getCurrentOffset()
}

// 初始化一个列表布局数据
const initPosition = () => {
  const _estimatedItemHeight = unref(estimatedItemHeight)
  originalListData.value.forEach((item, index) => {
    item.virtualListItemIndex = index
    positions.value.push({
      id: index,
      top: index * _estimatedItemHeight,
      bottom: (index + 1) * _estimatedItemHeight,
      height: _estimatedItemHeight
    })
  })
}

const updatePositions = () => {
  const nodes = listItemsRef.value
  if (!nodes) return
  nodes.forEach((node) => {
    const { height } = node.getBoundingClientRect()
    const id = +node.id
    const positionItem = positions.value[id]
    const diffValue = positionItem.height - height
    if (diffValue !== 0) {
      positionItem.height = height
      positionItem.bottom = positionItem.bottom - diffValue

      const len = originalListData.value.length
      for (let i = id + 1; i < len; i++) {
        const temp = positions.value[i]
        temp.top = positions.value[i - 1].bottom
        temp.bottom = temp.bottom - diffValue
      }
    }
  })
}

// 初始化数据
const initData = (scrollHeight) => {
  // const _container = containerRef.value
  // if (!_container) return
  const _estimatedItemHeight = unref(estimatedItemHeight)
  // const sh = _container.scrollHeight
  containerScrollHeight.value = scrollHeight
  count.value = Math.ceil(scrollHeight / _estimatedItemHeight)
  endIndex.value = startIndex.value + count.value
  placeholderHeight.value = _estimatedItemHeight * originalListData.value.length
}

// 初始化事件
// const initEvent = () => {
//   const _container = containerRef.value
//   if (!_container) return
//   _container.addEventListener('scroll', scrollEvent)
// }

initPosition()

onMounted(() => {
  // initEvent()
  const containerEl = containerRef.value
  if (!containerEl) return
  const scrollHeight = containerEl.scrollHeight
  initData(scrollHeight)
  useEvent(containerEl, 'scroll', scrollEvent, false)
})

onUpdated(async () => {
  await nextTick()
  updatePositions()
  offsetValue.value = getCurrentOffset()
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
  // height: 50px;
  box-sizing: border-box;
}
</style>
