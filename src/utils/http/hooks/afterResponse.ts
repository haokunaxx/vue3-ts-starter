import { AxiosResponse } from 'axios'
import { Transform, RequestOptions, MessageMode } from '../typings'
import { Result, ResultCode } from '#/axios.d'
import { responseIsSuccess } from '../utils'
import { isNull, isUnDef, isEmpty } from '@/utils/is'
import { ElMessage, ElMessageBox } from 'element-plus'
export const afterResponseHook: Transform['afterResponseHook'] = (
  res: AxiosResponse<Result>,
  options: RequestOptions
) => {
  const { isReturnNativeResponse, formatResponse } = options
  // 不处理直接返回
  if (isReturnNativeResponse) {
    return res
  }
  const { data } = res

  if (!formatResponse) {
    return data
  }

  if (!data) {
    throw Error('请求没有返回值')
  }

  const { message, code, result } = data

  if (responseIsSuccess(data)) {
    //成功
    let successMsg = message
    if (isNull(successMsg) || isUnDef(successMsg) || isEmpty(successMsg)) {
      successMsg = '请求成功'
    }
    // 判断是否需要提示
    const { successMessageMode } = options
    if (successMessageMode === MessageMode.MESSAGE) {
      ElMessage({
        type: 'success',
        message: successMsg
      })
    } else if (successMessageMode === MessageMode.MODAL) {
      ElMessageBox.alert(successMsg, '提示', {
        confirmButtonText: '好的'
      })
    }
    return result
  }

  // 失败
  // 根据code处理错误
  let logicErrorMsg = ''
  switch (code) {
    case ResultCode.FAIL:
    case ResultCode.UNAUTHORIZED:
    case ResultCode.FORBIDDEN:
    case ResultCode.NOT_FOUND:
    default:
      logicErrorMsg = message || '请求错误'
      break
  }
  const { errorMessageMode } = options
  if (errorMessageMode === MessageMode.MESSAGE) {
    ElMessage({
      type: 'error',
      message: logicErrorMsg
    })
  } else if (errorMessageMode === MessageMode.MODAL) {
    ElMessageBox.alert(logicErrorMsg, '提示', {
      confirmButtonText: '好的'
    })
  }

  throw new Error(logicErrorMsg)
}
