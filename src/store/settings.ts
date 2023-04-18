import { defineStore } from 'pinia'
import { useRouteStore } from './route'
import { RouteRecordRaw } from 'vue-router'

export const useSettingsStore = defineStore('settings', () => {
  const routeStore = useRouteStore()
  const isMultiApplication = ref<boolean>(true) //是否存在多个应用程序
  const activeApplication = ref<string | number>(0)

  const applicationList = computed(() => {
    return isMultiApplication.value
      ? routeStore.generatedRoutes.map((item) => {
          return {
            title: (item.meta?.title as string) || '',
            icon: (item.meta?.icon as string) || ''
          }
        })
      : []
  })

  const popSidebarMenuData = computed(() => routeStore.generatedRoutes)

  const sidebarMenuData: Ref<RouteRecordRaw[]> = computed(() => {
    if (isMultiApplication.value) {
      // 是多个应用程序的菜单
      return [routeStore.generatedRoutes[activeApplication.value]]
    } else {
      // 单个应用程序菜单
      return routeStore.generatedRoutes
    }
  })

  const toggleApplication = (value: string | number) => {
    if (typeof value === 'number') {
      activeApplication.value = value
    } else {
      activeApplication.value =
        routeStore.generatedRoutes.findIndex((route) => route.path === value) ||
        0
    }
  }

  const redirectCorrectApplication = (path: string) => {
    const applicationPath = path.split('/')[1]
    const res = routeStore.generatedRoutes.findIndex(
      (route) => route.path === '/' + applicationPath
    )
    toggleApplication(res === -1 ? 0 : res)
  }

  return {
    isMultiApplication,
    activeApplication,
    applicationList,
    sidebarMenuData,
    popSidebarMenuData,
    toggleApplication,
    redirectCorrectApplication
  }
})
