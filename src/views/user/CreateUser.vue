<template>
  <div class="w-full p-4 bg-white rounded-lg flex justify-center">
    <a-form class="w-[600px]" layout="vertical">
      <a-form-item name="email">
        <a-input v-model:value="form.email" size="large" placeholder="Please input email" />
      </a-form-item>
      <a-form-item name="name">
        <a-input v-model:value="form.name" size="large" placeholder="Please input name" />
      </a-form-item>
      <a-form-item name="age">
        <a-input-number v-model:value="form.age" class="w-full" size="large" placeholder="Please input age" />
      </a-form-item>
      <a-form-item name="password">
        <a-input-password v-model:value="form.password" size="large" placeholder="Please input password" />
      </a-form-item>
      <a-form-item name="passwordConfirm">
        <a-input-password v-model:value="form.passwordConfirm" size="large" placeholder="Please input password" />
      </a-form-item>
      <a-button class="mt-5 w-[100px]" type="primary" @click="createUser()">
        Create
      </a-button>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import adminAPI from '@/api/admin'
import { notification } from 'ant-design-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  age: undefined,
})

async function createUser() {
  const { email, password, passwordConfirm, name, age } = form

  if (!email || !password || !passwordConfirm || !name || (!age && age !== 0)) {
    notification.error({
      duration: 0.5,
      message: 'Please input all field',
    })
    return
  }

  if (password !== passwordConfirm) {
    notification.error({
      duration: 0.5,
      message: 'Please input password to euqal confirm password',
    })
    return
  }

  try {
    await adminAPI.createUser(form)

    router.push({ name: 'user' })
  } catch (_) {
  }
}
</script>

<style lang="scss">
</style>
