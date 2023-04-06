<template>
  <ElButton @click="reloadList">reload list</ElButton>
  <BaseLazyList
    ref="listRef"
    :list="list"
    :load-more="loadMore"
    :min-height="500"
    :optimized="true"
    listItemCls="list-item"
  >
    <template #list-item="{ item }">
      <div class="list-item" @click="handleClick(item)">
        <span>{{ item.id }}</span>
        <span>{{ item.title }}</span>
      </div>
    </template>

    <template #backup="{ list, isLoading }">
      <div class="list-loading-cover" v-if="!list.length && isLoading">
        <Icon icon="eos-icons:loading" :size="24" />
      </div>
    </template>
  </BaseLazyList>
</template>

<script setup lang="ts">
import { BaseLazyList } from '@/components/List/lazyList/index'
import Icon from '@/components/Icon/src/Icon.vue'
const list = ref<any[]>([])
const listRef = ref<InstanceType<typeof BaseLazyList> | null>(null)
const page = ref(0),
  pageSize = ref(10)

const fetchData = ({
  page,
  pageSize,
  condition
}: {
  page: number
  pageSize: number
  condition?: string
}) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        page > 6
          ? []
          : Array.from(
              {
                length: pageSize
              },
              (_, idx) => {
                const index = page * pageSize + idx
                return {
                  id: index,
                  title: index + '标题'.repeat(Math.random() * 5 + 1),
                  condition: condition ? index + condition : undefined
                }
              }
            )
      )
    }, 1000)
  )

const loadMore = () => {
  return fetchData({
    page: unref(page),
    pageSize: unref(pageSize)
  }).then((res) => {
    page.value++
    return res
  })
}
const handleClick = (item) => {
  console.log(item.id)
}
const reloadList = () => {
  page.value = 0
  listRef.value && listRef.value.reload()
}
onUnmounted(() => {
  console.log('index onUnmount')
})
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 0 0 0 6px;
  height: 50px;
  border-bottom: 1px solid #ddd;
}

.list-loading-cover {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(0 0 0 / 50%);
}
</style>
