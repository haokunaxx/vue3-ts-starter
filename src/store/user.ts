import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const roles = ref<string[]>(['admin']) //FIXME:
  const token = ref<string>('admin-token')

  return {
    roles,
    token
  }
})
