import axios, { AxiosResponse } from 'axios'
import { isFn } from '@/utils/is'
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import { CreateAxiosConfig, RequestOptions } from './typings'
import { Result } from '#/axios.d'
import cloneDeep from 'lodash/cloneDeep'

export class CustomAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosConfig
  constructor(options: CreateAxiosConfig) {
    this.axiosInstance = axios.create(options)
    this.options = options
    this.setupInterceptor()
  }

  private getTransform() {
    const { transform } = this.options
    return transform
  }

  private setupInterceptor() {
    const transform = this.getTransform()
    if (!transform) return

    const {
      requestInterceptors,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform

    //请求拦截器
    this.axiosInstance.interceptors.request.use(
      // @ts-ignore
      (config: AxiosRequestConfig) => {
        if (requestInterceptors && isFn(requestInterceptors)) {
          config = requestInterceptors(config)
        }
        return config
      },
      undefined
    )

    // 响应拦截器
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      if (responseInterceptors && isFn(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    // 响应异常拦截器
    responseInterceptorsCatch &&
      isFn(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, (err) => {
        console.log(this.axiosInstance)
        responseInterceptorsCatch(this.axiosInstance, err)
      })
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions) {
    return this.request<T>(
      {
        ...config,
        method: 'GET'
      },
      options
    )
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions) {
    return this.request<T>(
      {
        ...config,
        method: 'POST'
      },
      options
    )
  }

  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    let conf: CreateAxiosConfig = cloneDeep(config)
    const { requestOptions } = this.options
    const transform = this.getTransform()

    const opt = Object.assign({}, requestOptions, options)

    const { afterResponseHook, beforeRequestHook } = transform || {}

    if (beforeRequestHook && isFn(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }

    conf.requestOptions = opt

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res: AxiosResponse<Result>) => {
          if (afterResponseHook && isFn(afterResponseHook)) {
            try {
              const ret = afterResponseHook(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('request error!'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((err: Error | AxiosError) => {
          reject(err)
        })
    })
  }
}
