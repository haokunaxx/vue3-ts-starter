<script lang="ts">
import * as ElementIcons from '@element-plus/icons'
import { ElIcon } from 'element-plus'
import 'element-plus/es/components/icon/style/css'
import type { PropType } from 'vue'
import { defineComponent, createVNode, h, computed, unref, useAttrs } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { string } from 'vue-types'
import { omit } from 'lodash-es'

type ElIconList = keyof typeof ElementIcons
export default defineComponent({
  name: 'ElemIcon',
  inheritAttrs: false,
  props: {
    // iconName: oneOfType(array<keyof typeof ElementIcons>() as const),
    iconName: string<ElIconList>(),
    isLoading: propTypes.bool,
    color: propTypes.string,
    size: {
      type: [String, Number] as PropType<string | number>,
      default: 16
    }
  },
  setup(props) {
    const attrs = useAttrs()
    const getBindValues = computed(() => {
      return {
        ...props,
        ...unref(attrs),
        class: props.isLoading ? 'is-loading' : ''
      }
    })
    const bindValues = omit(unref(getBindValues), ['iconName', 'isLoading'])
    console.log(bindValues)
    return () =>
      h(ElIcon, bindValues, {
        default: () =>
          createVNode(ElementIcons[props.iconName as keyof typeof ElementIcons])
      })
  }
})
</script>
