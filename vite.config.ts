import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// vue自动导入
import AutoImport from 'unplugin-auto-import/vite'

// 组件按需导入
import Components from 'unplugin-vue-components/vite'

// ElementPlus 按需导入
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// elementPlus 按需导入
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

// 本地svg图标资源支持
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import path from 'path'

const pathSrc = path.resolve(__dirname, 'src')

const svgIconsPluginCreator = (isBuild: boolean) => {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
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

        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ],

        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: path.resolve(pathSrc, 'auto-import.d.ts')
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep']
          })
        ],
        dts: path.resolve(pathSrc, 'components.d.ts')
      }),
      // fix: element-plus icon按需引入自动安装 <i-ep-xxx>
      Icons({
        autoInstall: true
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
