import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// vue自动导入
import AutoImport from 'unplugin-auto-import/vite'

// 组件按需导入
import Components from 'unplugin-vue-components/vite'

// ElementPlus 按需导入
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 本地svg图标资源支持
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import path from 'path'

const pathSrc = path.resolve(__dirname, 'src')

const svgIconsPluginCreator = (isBuild: boolean) => {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    symbolId: 'icon-[dir]-[name]'
  })
  return svgIconsPlugin
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  return {
    plugins: [
      vue(),
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],

        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [ElementPlusResolver()],

        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: path.resolve(pathSrc, 'auto-import.d.ts')
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver()
        ],
        dts: path.resolve(pathSrc, 'components.d.ts')
      }),
      svgIconsPluginCreator(isBuild)
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
})
