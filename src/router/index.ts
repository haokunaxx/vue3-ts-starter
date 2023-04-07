import { createRouter, createWebHashHistory } from 'vue-router'
import { ConstantRoutes } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: ConstantRoutes
})

export { router }
