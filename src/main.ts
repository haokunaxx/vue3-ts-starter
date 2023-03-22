// 注册svg图标
import 'virtual:svg-icons-register'

import { createApp } from 'vue'

// 支持SvgIcon
import 'virtual:svg-icons-register'
// 支持iconify
import '@purge-icons/generated'
// iconfont引入
import '@/assets/iconfont/iconfont'
import '@/assets/iconfont/iconfont.css'

import App from './App.vue'

import '@/assets/icons/iconfont'

createApp(App).mount('#app')
