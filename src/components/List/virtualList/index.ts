import virtualList from './src/Index.vue'
import heightFixed from './src/HeightFixed.vue'

import { withInstall } from '@/utils/install'

export const VirtualList = withInstall(virtualList)

export const VirtualListHeightFixed = withInstall(heightFixed)
