<template>
  <div class="lazy-list-container">
    <div class="lazy-list-container-scroll" ref="container">
      <slot
        name="backup"
        :hasMore="hasMore"
        :isLoading="isLoading"
        :list="list"
      ></slot>
      <div>
        <slot name="before-list"></slot>
        <div class="lazy-list" ref="listRef">
          <slot
            name="list-item"
            v-for="item in list"
            :key="item.id"
            :item="item"
          >
            <p class="list-item-default">
              {{ item.id }}
            </p>
          </slot>
          <!-- <slot name="load-tip" :hasMore="hasMore" :isLoading="isLoading"> </slot> -->
        </div>
        <slot name="after-list" :hasMore="hasMore" :isLoading="isLoading">
          <p class="list-load-tip">
            {{
              hasMore
                ? isLoading
                  ? 'Loading...'
                  : 'Scroll to load more'
                : 'No more data'
            }}
          </p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLazyList } from '@/hooks/components/useLazyList'
type ListItem = Record<string, any> & { id: string }
interface Props {
  list: ListItem[]
  loadMore: Function
  optimized?: boolean
  listItemCls?: string
}

const props = defineProps<Props>()

const container = ref<HTMLElement | null>(null),
  listRef = ref<HTMLElement | null>(null)

const listCacheMap = ref<WeakMap<HTMLElement, string>>(new WeakMap())
const { list, isLoading, hasMore, reload } = useLazyList<ListItem>({
  container,
  visibleData: props.list,
  loadMore: props.loadMore
})

defineExpose({
  reload
})
// FIXME: 重复observe
const observe = (root, item, rootMargin = 0) => {
  const io = new IntersectionObserver(
    (entries) => {
      const entry = entries[0],
        target = entry.target as HTMLElement
      if (!listCacheMap.value.get(target)) {
        listCacheMap.value.set(target, target.innerHTML)
      }
      if (!entry.isIntersecting) {
        target.innerHTML = ''
        return
      }
      target.innerHTML = listCacheMap.value.get(target) || target.innerHTML
    },
    {
      root,
      rootMargin: `${rootMargin}px`,
      threshold: [0, 1]
    }
  )
  io.observe(item)
}

const collectInvisibleElemToBackup = () => {
  const listEl = listRef.value
  if (!listEl) return
  const items = listEl.querySelectorAll(('.' + props.listItemCls) as string)
  items.forEach((item) => observe(container.value, item))
}

if (props.optimized && !props.listItemCls) {
  console.warn(
    'Enable optimization for list needs to assign className of the list item'
  )
}

props.optimized &&
  props.listItemCls &&
  watch(
    () => list,
    async () => {
      await nextTick()
      collectInvisibleElemToBackup()
    },
    {
      deep: true
    }
  )
onUnmounted(() => {
  console.log('base list Unmounted')
  listCacheMap.value = new WeakMap()
})
</script>

<style lang="scss" scoped>
.lazy-list-container {
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 500px;
  border: 1px solid #ddd;

  &-scroll {
    overflow: auto;
    width: 100%;
    height: 100%;
  }
}

.list-item {
  &-default {
    padding-left: 6px;
    height: 50px;
    border-bottom: 1px solid #ddd;
  }
}
</style>
