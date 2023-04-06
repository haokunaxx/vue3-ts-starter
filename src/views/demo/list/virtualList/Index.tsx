import { FunctionalComponent } from 'vue'
import { VirtualList } from '@/components/List/virtualList/index'
import { ListItem } from './Item'
export const VirtualListDemo1: FunctionalComponent = () => {
  const originalListData = ref<
    {
      id: number
      value: string
    }[]
  >([])
  originalListData.value = Array.from(
    {
      length: 1000
    },
    (_, idx) => {
      return {
        id: idx,
        value: idx + '字符内容'.repeat(Math.random() * 20 + 1),
        title: idx + '标题'.repeat(Math.random() * 5 + 1),
        description: '描述'.repeat(Math.random() * 24 + 1)
      }
    }
  )
  return h(
    VirtualList,
    {
      originalListData: originalListData
    },
    {
      default: ({ item }) => <ListItem item={item} />
    }
  )
}
