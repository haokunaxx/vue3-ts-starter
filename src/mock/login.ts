import { MockMethod, Recordable } from 'vite-plugin-mock'
import { Result, ResultCode } from './typings'

import { LoginResult } from '@/api/user'

interface Token {
  admin: string
  visitor: string
}

export enum Tokens {
  admin = 'thisisadmintoken',
  visitor = 'thisisvisitortoken'
}

const users = {
  [Tokens.admin]: {
    introduction: 'I am a super administrator',
    username: 'admin',
    name: 'Super Admin',
    roles: ['admin']
  },
  [Tokens.visitor]: {
    introduction: 'I am a visitor',
    username: 'visitor',
    name: 'Visitor',
    roles: ['visitor']
  }
}

const login: MockMethod = {
  url: '/api/login',
  method: 'post',
  response(opt: { body: Recordable }): Result<LoginResult | null> {
    const username: keyof Token = opt.body.username
    console.log(opt.body, username)
    const token = Tokens[username]
    if (!token) {
      return {
        code: ResultCode.FAIL,
        message: '登录名或密码错误',
        result: null
      }
    }
    return {
      code: ResultCode.SUCCESS,
      message: '登陆成功',
      result: {
        token
      }
    }
  }
}

const logout: MockMethod = {
  url: '/api/logout',
  method: 'post',
  response(): Result<null> {
    return {
      code: ResultCode.SUCCESS,
      message: '登出成功',
      result: null
    }
  }
}

const getUserInfo: MockMethod = {
  url: '/api/user',
  method: 'post',
  response(opt): Result<typeof users | null> {
    const token = opt.body.token
    const info = users[token]
    if (!info) {
      return {
        code: ResultCode.NOT_FOUND,
        message: '登陆失效，无法获取到用户信息',
        result: null
      }
    }
    return {
      code: ResultCode.SUCCESS,
      message: '获取用户信息成功',
      result: info
    }
  }
}

export default [login, logout, getUserInfo]
