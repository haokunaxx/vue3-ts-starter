import { router } from './index'
import { authRoutes } from './config'

import { useUserStore } from '@/store/user'
import { useRouteStore } from '@/store/route'
import { useSettingsStore } from '@/store/settings'

import { GetUserInfo } from '@/api/user'

import { getToken, removeToken } from '@/utils/auth'

router.beforeEach(async (to, _, next) => {
  const userStore = useUserStore(),
    routeStore = useRouteStore(),
    settingsStore = useSettingsStore()

  const hasToken = getToken()

  const hasRole = userStore.roles.length > 0,
    isToLoginPage = to.path === '/login'

  const LogoutHandler = () => {
    const userStore = useUserStore()
    userStore.setToken('')
    userStore.setRoles([])
    removeToken()
  }

  //存在token
  if (hasToken) {
    //去login页面
    if (isToLoginPage) {
      LogoutHandler()
      next()
      //去其他页面
    } else {
      //存在角色
      if (hasRole) {
        next()
      } else {
        // 获取角色权限 然后生成路由 然后跳转
        try {
          const info = await GetUserInfo({
            token: userStore.token
          })
          if (!info) {
            return next('/login')
          }
          userStore.setRoles(info.roles)
          // 生成路由然后跳转
          routeStore.generateAuthRoutes(authRoutes, info.roles)
          routeStore.configAuthRoutes()
          settingsStore.redirectCorrectApplication(to.path)
          next({ ...to, replace: true })
        } catch (err) {
          LogoutHandler()
          return next('/login')
        }
      }
    }
  } else {
    LogoutHandler()
    if (isToLoginPage) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
