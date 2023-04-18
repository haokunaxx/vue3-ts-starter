<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  parentRoute?: string
  route: string
}

const props = defineProps<Props>()

const isExternal = (path: string) => {
  return /^http(s{0,1}):\/\//.test(path)
}
const { route } = toRaw(props)

const _isExternal = isExternal(route)

const linkType = computed(() => (_isExternal ? 'a' : 'router-link'))

const linkProps = () =>
  _isExternal
    ? {
        target: 'blank',
        href: route
      }
    : {
        to: `${route}`
      }
</script>

<template>
  <component :is="linkType" v-bind="linkProps()">
    <slot></slot>
  </component>
</template>
