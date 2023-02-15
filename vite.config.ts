import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// vue自动导入
import AutoImport from 'unplugin-auto-import/vite'

import path from 'path'

const pathSrc = path.resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: path.resolve(pathSrc, 'auto-import.d.ts')
    })
  ]
})
