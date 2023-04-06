import { FunctionalComponent } from 'vue'

import './index.scss'

interface Props {
  item: { id: number; value: string; description: string; title: string }
}

export const ListItem: FunctionalComponent = ({ item }: Props) => {
  return h('div', { class: 'list-item' }, [
    h('p', { class: 'list-item-title' }, item.title),
    h('p', { class: 'list-item-description' }, item.description)
  ])
}

// export default defineComponent({
//   name: 'TestListItem',
//   props: {
//     item: {
//       type: ListItem,
//       requ
//     }
//   },
//   setup(){
//     return () => h('div', {}, [
//       h('p', { class: 'test-list-item-title'}, )
//     ])
//   }
// })
