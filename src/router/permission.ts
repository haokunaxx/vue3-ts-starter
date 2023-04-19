import { router } from './index'
import { useUserStore } from '@/store/user'
import { useRouteStore } from '@/store/route'
import { useSettingsStore } from '@/store/settings'
import { getToken } from '@/utils/auth'
import { authRoutes } from './authRoutes'

router.beforeEach(async (to, _, next) => {
  const userStore = useUserStore(),
    routeStore = useRouteStore()
  const settingsStore = useSettingsStore()
  const hasToken = getToken(),
    hasRole = userStore.roles.length > 0,
    hasRouteGenerated = routeStore.hasRouteGenerated,
    isToLoginPage = to.path === '/login'
  if (hasToken) {
    if (isToLoginPage) {
      next()
    } else {
      if (hasRole) {
        if (hasRouteGenerated) {
          next()
        } else {
          // 生成路由然后跳转
          routeStore.generateAuthRoutes(authRoutes)
          routeStore.configAuthRoutes()
          settingsStore.redirectCorrectApplication(to.path)
          next({ ...to, replace: true })
        }
      } else {
        // 获取角色权限 然后生成路由 然后跳转
      }
    }
  } else {
    if (isToLoginPage) {
      // FIXME: 跳转登陆页逻辑开发
    } else {
      // FIXME: 跳转登陆页并添加上重定向地址
    }
  }
})
