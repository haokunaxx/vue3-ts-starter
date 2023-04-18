import { RouteRecordRaw } from 'vue-router'
import { BreadcrumbRoute } from './breadcrumb'
import { MultiLevelMenuRoute } from './multiLevelMenu'

const getAuthRoutes = () => [...BreadcrumbRoute, ...MultiLevelMenuRoute]

export const authRoutes = [...getAuthRoutes()]

export const multiApplicationAuthRoutes: RouteRecordRaw[] = [
  {
    meta: {
      title: '应用一',
      icon: 'ic:baseline-10mp'
    },
    name: 'TestApplication1',
    path: '/test-app1',
    redirect: '/test-app1/breadcrumb-demo/list1',
    children: BreadcrumbRoute
  },
  {
    meta: {
      title: '应用二',
      icon: 'ic:twotone-zoom-in'
    },
    name: 'TestApplication2',
    path: '/test-app2',
    redirect: '/test-app2/multi-level-menu/menu1',
    children: MultiLevelMenuRoute
  }
]
export const singleApplicationAuthRoutes: RouteRecordRaw[] = [
  ...BreadcrumbRoute,
  ...MultiLevelMenuRoute
]
