import { Transform } from '../typings'

export const responseInterceptors: Transform['responseInterceptors'] = (
  res
) => {
  return res
}

export const responseInterceptorsCatch: Transform['responseInterceptorsCatch'] =
  (instance, error) => {
    console.log(instance, error)
  }
