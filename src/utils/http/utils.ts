// import { AxiosResponse } from 'axios'
import { Result, ResultCode } from '#/axios.d'

export const responseIsSuccess = (data: Result) =>
  data && Reflect.has(data, 'code') && data['code'] === ResultCode.SUCCESS
