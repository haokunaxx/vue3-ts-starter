import type { RouteRecordRaw } from 'vue-router'
import { projectIndexRoutePath } from './config'
export const BasicRoutes: RouteRecordRaw[] = [
  {
    name: 'Login',
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '@/modules/Login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    name: 'Redirect',
    path: '/redirect',
    component: () =>
      import(/* webpackChunkName: "Redirect" */ '@/modules/Redirect/index'),
    meta: {
      title: '重定向'
    }
  }
  // {
  //   name: 'NotFound',
  //   path: '/:notFound(.*)', //https://router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%9C%A8%E5%8F%82%E6%95%B0%E4%B8%AD%E8%87%AA%E5%AE%9A%E4%B9%89%E6%AD%A3%E5%88%99
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "NotFound" */ '@/modules/Other/NotFound/index'
  //     ),
  //   meta: {
  //     title: '页面未找到'
  //   }
  // }
]

export const NormalRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/Index/index.vue'),
    redirect: projectIndexRoutePath,
    children: [
      {
        name: 'Home',
        path: 'home',
        component: () => import('@/modules/Home/index'),
        meta: {
          title: '首页'
        }
      },
      {
        name: 'PersonalSettings',
        path: 'personal-settings',
        component: () => import('@/modules/PersonalSettings/index'),
        meta: {
          title: '个人设置'
        }
      }
    ]
  }
]

export const ConstantRoutes = [...NormalRoutes, ...BasicRoutes]
