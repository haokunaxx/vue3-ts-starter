// import BasicIcon from './src/Icon.vue'
// import { App } from 'vue'
// export const withInstall = <T>(component: T, alias?: string) => {
//   const comp = component as any
//   // 注册组件
//   comp.install = (app: App) => {
//     app.component(comp.name || comp.displayName, component)
//     if (alias) {
//       app.config.globalProperties[alias] = component
//     }
//   }
//   return component
// }

// export const Icon = withInstall(BasicIcon)
// import ElIcon from './src/ElIcon.vue'
import Icon from './src/Icon.vue'
import SvgIcon from './src/SvgIcon.vue'
import EpIcon from './src/EpIcon.vue'

export { EpIcon, SvgIcon, Icon }
