import { AxiosRequestConfig } from 'axios'
import { Transform } from '../typings'
export const requestInterceptors: Transform['requestInterceptors'] = (
  config: AxiosRequestConfig
) => {
  // TODO: 设置token相关逻辑
  return config
}
