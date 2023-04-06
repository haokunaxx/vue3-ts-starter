import { FunctionalComponent } from 'vue'
import { VirtualListHeightFixed } from '@/components/List/virtualList/index'
import { ListItem } from './Item'
export const VirtualListDemo2: FunctionalComponent = () => {
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
        value: idx + '字符内容'.repeat(Math.random() * 10 + 1),
        title: idx + '标题'.repeat(Math.random() * 5 + 1),
        description: '描述'.repeat(Math.random() * 10 + 1)
      }
    }
  )
  return h(
    VirtualListHeightFixed,
    {
      originalListData: originalListData,
      bufferPercent: 0.2
    },
    {
      default: ({ item }) => <ListItem item={item} />
    }
  )
}
