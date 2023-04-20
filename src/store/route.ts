import { defineStore } from 'pinia'
// import { useUserStore } from './user'
import type { RouteRecordRaw } from 'vue-router'
import { router } from '@/router/index'
import { generateRoutesWithRoles } from '@/router/utils'

// import { useSettingsStore } from './settings'
// import cloneDeep from 'lodash/cloneDeep'
// import { filterRoutesByAuth } from '@/router/utils'

export const useRouteStore = defineStore('routes', () => {
  // const userStore = useUserStore()

  const hasRouteGenerated = ref<boolean>(false)
  const removeRoutes: (() => void)[] = [] //用于logout后删除的route
  // activeRoute = '', //当前的route
  const generatedRoutes = ref<RouteRecordRaw[]>([]) //格式化处理后的路由数据（用于注册路由、渲染导航菜单）

  // let rawRoutes: RouteRecordRaw[] = []

  // 获取匹配到的路由 => 面包屑
  // const getMatchRoutes = () => {}

  //生成路由
  const generateAuthRoutes = (authRoutes: RouteRecordRaw[], roles) => {
    // rawRoutes = cloneDeep(authRoutes)
    const res = generateRoutesWithRoles(roles, authRoutes)
    generatedRoutes.value = res
    console.log(res)
    hasRouteGenerated.value = true
    // addRoutesToProject(res)
  }

  //配置权限路由
  const configAuthRoutes = () => {
    generatedRoutes.value.forEach((route) => {
      if (!/^(https?:|mailto:|tel:)/.test(route.path)) {
        removeRoutes.push(
          // 添加路由到项目
          router.addRoute(route)
        )
      }
    })
    console.log(router.getRoutes())
  }

  //重置路由
  const resetRoutes = () => {
    removeRoutes.forEach((removeFn) => removeFn())
  }

  return {
    hasRouteGenerated,
    generatedRoutes,
    generateAuthRoutes,
    configAuthRoutes,
    resetRoutes
  }
})
