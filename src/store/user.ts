import { defineStore } from 'pinia'
import { getToken } from '@/utils/auth'
type Roles = string[]

export const useUserStore = defineStore('user', () => {
  const roles = ref<Roles>([])
  const token = ref<string>(getToken() || '')

  const setRoles = (_roles: Roles) => {
    roles.value.push(..._roles)
  }

  const setToken = (_token: string) => {
    token.value = _token
  }

  return {
    roles,
    token,
    setRoles,
    setToken
  }
})
