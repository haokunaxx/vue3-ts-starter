import { defHttp } from '@/utils/http'
import { Result } from '#/axios.d'

interface LoginRequestBody {
  username: string
  password: string
}

export interface LoginResult {
  token: string
}

export type LoginResponse = Result<LoginResult>
// 登录
export const Login = (data: LoginRequestBody): Promise<LoginResult> => {
  return defHttp.post<LoginResult>({
    url: 'login',
    data
  })
}
