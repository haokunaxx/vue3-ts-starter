import cloneDeep from 'lodash/cloneDeep'
import { CustomAxios } from './axios'
import { deepMerge } from '@/utils/tool'
import { requestInterceptors } from './interceptors/request'
import {
  responseInterceptors,
  responseInterceptorsCatch
} from './interceptors/response'

import { beforeRequestHook } from './hooks/beforeRequest'
import { afterResponseHook } from './hooks/afterResponse'
import type { CreateAxiosConfig, Transform } from './typings'

const transform: Transform = {
  requestInterceptors,
  responseInterceptors,
  responseInterceptorsCatch,
  beforeRequestHook,
  afterResponseHook
}

export function createAxios(opt?: Partial<CreateAxiosConfig>) {
  return new CustomAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        headers: {
          'Content-Type': 'application/json'
        },
        transform: cloneDeep(transform),
        requestOptions: {
          errorMessageMode: 'silent',
          retryRequest: {
            isOpen: true,
            count: 5,
            waitTime: 300
          },
          isReturnNativeResponse: false
        }
      },
      opt
    )
  )
}

export const defHttp = createAxios()
