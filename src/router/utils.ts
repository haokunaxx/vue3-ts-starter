import { RouteRecordRaw } from 'vue-router'
import { isString, isArray } from '@/utils/is'

// 判断是否存在权限
const hasPermission = (roles: string[], route: RouteRecordRaw): boolean => {
  if (route.meta?.roles) {
    return roles.some((role) => {
      if (isString(route.meta?.roles)) {
        return role === route.meta?.roles
      } else if (isArray(route.meta?.roles)) {
        return (route.meta?.roles as string[]).includes(role)
      }
    })
  }
  return true
}

// 格式话路由生成用于注册的路由对象
export const getAuthFilterRoutes = (
  roles: string[],
  routes: RouteRecordRaw[]
) => {
  const filterRes: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (hasPermission(roles, route)) {
      if (route.children) {
        route.children = getAuthFilterRoutes(roles, route.children)
      }
      filterRes.push(route)
    }
  })
  return filterRes
}

// 根据角色和原始路由生成路由
export const generateRoutesWithRoles = (
  roles: string[],
  routes: RouteRecordRaw[]
) => {
  if (roles.includes('admin')) {
    //管理员 所有路由可见
    // return formateRoutes(roles, routes)
    return routes
  } else {
    // 根据权限生成
    return getAuthFilterRoutes(roles, routes)
  }
}

// const getApplicationList = () => {

// }

// const getSidebarMenuData = (isMultiApplication: boolean, routes: RouteRecordRaw[]) => {
//   if(isMultiApplication){

//   }else{

//   }
// }
