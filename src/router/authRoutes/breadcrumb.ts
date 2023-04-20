import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/Index/index.vue')

export default [
  {
    meta: {
      title: '应用一',
      icon: 'ic:baseline-10mp',
      roles: ['admin', 'visitor']
    },
    name: 'TestApplication1',
    path: '/test-app1',
    redirect: '/test-app1/breadcrumb-demo/list1',
    children: [
      {
        name: 'BreadcrumbDemo',
        path: 'breadcrumb-demo',
        component: Layout,
        meta: {
          title: '面包屑导航'
        },
        children: [
          {
            name: 'BreadcrumbDemoList1',
            path: 'list1',
            component: () =>
              import('@/modules/Demo/Breadcrumb/views/list1.vue'),
            meta: {
              title: '平级导航模式（列表页1）',
              icon: 'ic:baseline-bathroom'
            }
          },
          {
            name: 'BreadcrumbDemoDetail1',
            path: 'detail1',
            component: () =>
              import('@/modules/Demo/Breadcrumb/views/detail1.vue'),
            meta: {
              title: '平级导航模式（详情页1）',
              icon: 'ic:baseline-bed'
            }
          },
          {
            // name: 'BreadcrumbDemoList2',
            path: 'list2',
            redirect: 'breadcrumb-demo/list2',
            meta: {
              title: '层级导航模式（列表页2）',
              icon: 'ic:baseline-bedroom-baby'
            },
            children: [
              {
                name: 'BreadcrumbDemoList2',
                path: '',
                component: () =>
                  import('@/modules/Demo/Breadcrumb/views/list2.vue'),
                meta: {
                  title: '层级导航模式（列表页2）',
                  icon: 'ic:baseline-bedroom-parent',
                  sidebar: false //隐藏
                }
              },
              {
                name: 'BreadcrumbDemoDetail2',
                path: 'detail2',
                component: () =>
                  import('@/modules/Demo/Breadcrumb/views/detail2.vue'),
                meta: {
                  title: '层级导航模式（详情页2）',
                  icon: 'ic:baseline-blender',
                  sidebar: false //隐藏
                }
              }
            ]
          }
        ]
      }
    ]
  }
] as RouteRecordRaw[]
