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
export const Login = (data: LoginRequestBody): Promise<LoginResponse> => {
  return defHttp.post<LoginResponse>({
    url: 'login',
    data
  })
}

export type GetUserInfoRequestBody = {
  token: string
}

export type GetUserInfoResult = {
  introduction: string
  username: string
  name: string
  roles: string[]
}
export const GetUserInfo = (
  data: GetUserInfoRequestBody
): Promise<GetUserInfoResult> => {
  return defHttp.post<GetUserInfoResult>({
    url: 'user',
    data
  })
}
