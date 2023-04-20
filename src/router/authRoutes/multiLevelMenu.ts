import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/Index/index.vue')

export default [
  {
    meta: {
      title: '应用二',
      icon: 'ic:twotone-zoom-in',
      roles: ['admin']
    },
    name: 'TestApplication2',
    path: '/test-app2',
    redirect: '/test-app2/multi-level-menu/menu1',
    children: [
      {
        name: 'MultiLevelMenuDemo',
        path: 'multi-level-menu',
        component: Layout,
        meta: {
          title: '多级菜单'
        },
        children: [
          {
            name: 'Menu1',
            path: 'menu1',
            component: () =>
              import('@/modules/Demo/MultiLevelMenu/views/Menu1.vue'),
            meta: {
              title: '菜单1',
              icon: 'ic:baseline-chair'
            }
          },
          {
            name: 'Menu2',
            path: 'menu2',
            redirect: 'multi-level-menu/menu2/menu2-1',
            meta: {
              title: '菜单2',
              icon: 'ic:baseline-coffee'
            },
            children: [
              {
                name: 'Menu2-1',
                path: 'menu2-1',
                component: () =>
                  import('@/modules/Demo/MultiLevelMenu/views/Menu2-1.vue'),
                meta: {
                  title: '菜单2-1',
                  icon: 'ic:baseline-flatware'
                }
              },
              {
                name: 'Menu2-2',
                path: 'menu-2-2',
                redirect: 'multi-level-menu/menu-2-2/menu-2-2-1',
                meta: {
                  title: '菜单2-2',
                  icon: 'ic:baseline-shower'
                },
                children: [
                  {
                    name: 'Menu2-2-1',
                    path: 'menu2-2-1',
                    component: () =>
                      import(
                        '@/modules/Demo/MultiLevelMenu/views/Menu2-2-1.vue'
                      ),
                    meta: {
                      title: '菜单2-2-1',
                      icon: 'ic:baseline-yard'
                    }
                  },
                  {
                    name: 'Menu2-2-2',
                    path: 'menu2-2-2',
                    component: () =>
                      import(
                        '@/modules/Demo/MultiLevelMenu/views/Menu2-2-2.vue'
                      ),
                    meta: {
                      title: '菜单2-2-2',
                      icon: 'ic:baseline-coffee-maker'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
] as RouteRecordRaw[]
