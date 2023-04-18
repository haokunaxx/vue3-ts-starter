// 注册svg图标
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router/index'
// 支持SvgIcon
import 'virtual:svg-icons-register'
// 支持iconify
import '@purge-icons/generated'
// iconfont引入
import '@/assets/iconfont/iconfont'
import '@/assets/iconfont/iconfont.css'

import 'animate.css'
import App from './App.vue'

import '@/assets/icons/iconfont'
import '@/styles/reset.scss'
// import '@/styles/common.scss'
import '@/styles/index.scss'

import './router/permission'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
