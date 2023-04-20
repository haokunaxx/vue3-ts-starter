import { RouteRecordRaw } from 'vue-router'

const modules = import.meta.globEager('./authRoutes/*.ts')

const authRoutes: RouteRecordRaw[] = []

Object.keys(modules).forEach((key) => {
  console.log(modules[key])
  authRoutes.push(...(modules[key] as any).default)
})

export {
  // 需要鉴权的路由
  authRoutes
}

// 登录成功后显示的页面路由
export const projectIndexRoutePath = '/test-app1'

// 是否是多应用程序路由模式
export const isMultipleApplication = true
