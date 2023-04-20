<template>
  <div class="login-page-container">
    <div class="center-wrapper">
      <section class="left"></section>
      <section class="right">
        <div class="logo"></div>
        <div class="form-wrapper">
          <ElForm :model="form">
            <ElFormItem>
              <ElInput v-model="form.username">
                <template #prefix>
                  <Icon icon="mdi:user" />
                </template>
              </ElInput>
            </ElFormItem>
            <ElFormItem>
              <ElInput type="password" v-model="form.password">
                <template #prefix>
                  <Icon icon="solar:lock-password-bold" />
                </template>
              </ElInput>
            </ElFormItem>
            <ElButton
              type="primary"
              class="submit-btn"
              :disabled="loginBtnDisabled"
              :loading="submitBtnLoading"
              @click="login"
            >
              登录
            </ElButton>
          </ElForm>
        </div>
        <div class="shortcut-btn-list-wrapper">
          <ul class="shortcut-btn-list">
            <li
              class="shortcut-btn-list-item"
              v-for="item in shortcutBtnList"
              :key="item.username"
            >
              <ElButton @click="shortcutBtnClick(item)">{{
                item.label
              }}</ElButton>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import debounce from 'lodash/debounce'

import { Icon } from '@/components/Icon/index'

import { useUserStore } from '@/store/user'

import { projectIndexRoutePath } from '@/router/config'

import { Login } from './api'

import { setToken } from '@/utils/auth'
interface LoginForm {
  username: string
  password: string
}
interface ShortcutBtnListItem {
  label: string
  username: string
  password: string
}

const form = reactive<LoginForm>({
  username: '',
  password: ''
})
const submitBtnLoading = ref<boolean>(false)

const shortcutBtnList: ShortcutBtnListItem[] = [
  {
    label: 'admin',
    username: 'admin',
    password: 'anyway'
  },
  {
    label: 'visitor',
    username: 'visitor',
    password: 'idontknow'
  }
]

const loginBtnDisabled = computed(() => !form.password || !form.username)

const route = useRoute(),
  router = useRouter()
const useStore = useUserStore()

const login = debounce(
  async () => {
    if (loginBtnDisabled.value) return
    submitBtnLoading.value = true

    const res = await Login(form)
      .catch((err) => console.log(err))
      .finally(() => {
        submitBtnLoading.value = false
      })
    if (!res) return

    useStore.setToken(res.token)
    setToken(res.token)

    const redirectPath = route.query['redirect'] as string
    return router.push({
      path: redirectPath ? redirectPath : projectIndexRoutePath
    })
  },
  300,
  {
    leading: true
  }
)

const shortcutBtnClick = (item: ShortcutBtnListItem) => {
  form.username = item.username
  form.password = item.password
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
