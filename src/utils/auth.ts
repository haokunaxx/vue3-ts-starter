// export const getToken = () => 'admin-token'
import Cookie from 'js-cookie'

const TOKEN = 'vue3-ts-starter-token^^'

export function setToken(token: string) {
  return Cookie.set(TOKEN, token)
}

export function getToken() {
  return Cookie.get(TOKEN)
}

export function removeToken() {
  return Cookie.remove(TOKEN)
}
