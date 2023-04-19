import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'

export interface RetryRequest {
  isOpen: boolean
  count: number
  waitTime: number
}

export interface RequestOptions {
  // 错误消息提示模式
  errorMessageMode: 'modal' | 'message' | 'silent'
  // 重试选项
  retryRequest: RetryRequest
  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  isReturnNativeResponse: boolean
}

export abstract class Transform {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  responseInterceptors?: (response: AxiosResponse) => AxiosResponse
  responseInterceptorsCatch?: (instance: AxiosInstance, error: Error) => void
  afterResponseHook?: (...args: any[]) => any
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions
  ) => CreateAxiosConfig
}

export interface CreateAxiosConfig extends AxiosRequestConfig {
  requestOptions?: RequestOptions
  transform?: Transform
}
