<template>
  <!-- 本地svg资源使用 -->
  <SvgIcon v-if="isSvgIcon" :name="getSvgIcon" :size="size" :spin="spin" :class="[$attrs.class, 'preset-icon']"/>
  <template v-else>
    <!-- iconfont -->
    <span v-if="isIconfont" :class="[spin && 'iconify-wrap-spin']">
        <svg class="icon" aria-hidden="true">
            <use :xlink:href="getIconRef"></use>
        </svg>
    </span>
    <!-- iconify -->
    <span
      v-else
      ref="wrapRef"
      :class="[$attrs.class, 'iconify-wrap preset-icon', spin && 'iconify-wrap-spin']"
      :style="getStyle"
    ></span>
  </template>
</template>

<script lang="ts">
import { propTypes } from '@/utils/propTypes'
import { isString } from '@/utils/is'
import { CSSProperties, defineComponent, computed } from 'vue'
import Iconify from '@purge-icons/generated'
import SvgIcon from './SvgIcon.vue'

const SVG_ICON_FLAG = '|svg'

export default defineComponent({
  name: 'Icon',
  props: {
    color: propTypes.string,
    spin: propTypes.bool.def(false),
    size: {
      type: [String, Number],
      default: 16
    },
    icon: {
      type: String,
      required: true
    },
    prefix: propTypes.string.def(''),
    iconfont:propTypes.bool.def(false),
  },
  setup(props) {
    const wrapRef = ref<ElRef>(null)

    const isSvgIcon = computed(() => props.icon.endsWith(SVG_ICON_FLAG))
    const getSvgIcon = computed(() => props.icon.replace(SVG_ICON_FLAG, ''))
    const isIconfont = computed(() => !unref(isSvgIcon) && props.iconfont)

    const getIconRef = computed(() => `${props.prefix ? props.prefix : ''}${props.icon}`)

    const update = () => {

      // SvgIcon 不更新
      if(unref(isSvgIcon))return;
      // iconfont不更新
      if(unref(isIconfont))return;

      const el = unref(wrapRef)
      if (!el)
      return

      const icon = unref(getIconRef)

      // await nextTick()
      const svg = Iconify.renderSVG(icon, {})
      if (svg) {
        //
        el.textContent = ''
        el.appendChild(svg)
      } else {
        //
        const span = document.createElement('span')
        span.className = 'iconify'
        span.dataset.icon = icon
        el.textContent = ''
        el.appendChild(span)
      }
    }

    const getStyle = computed((): CSSProperties => {
      const { size, color } = props
      let fs = size
      if (isString(fs)) {
        fs = parseInt(fs, 10)
      }
      return {
        fontSize: `${fs}px`,
        color: color,
        display: 'inline-flex'
      }
    })

    watch(() => props.icon, update, { flush: 'post' })

    onMounted(update)

    return {
      wrapRef,
      isSvgIcon,
      getSvgIcon,
      isIconfont,
      getIconRef,
      getStyle
    }
  }
})
</script>

<style lang="scss" scoped>
@keyframes loadingCircle {
  to {
    transform: rotate(360deg);
  }
}

.iconify-wrap {
  display: inline-block;
  // vertical-align: middle;
  &-spin {
    :deep(svg) {
      animation: loadingCircle 1s infinite linear;
    }
  }
}
</style>  