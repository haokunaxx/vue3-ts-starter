import { createApp } from 'vue'

// 支持SvgIcon
import 'virtual:svg-icons-register'
// 支持iconify
import '@purge-icons/generated'
// iconfont引入
import '@/assets/iconfont/iconfont'
import '@/assets/iconfont/iconfont.css'

import App from './App.vue'

createApp(App).mount('#app')
