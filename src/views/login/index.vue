<template>
  <div class="absolute w-[375px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col gap-4 bg-[white] overflow-hidden border-[rgb(45,_194,_117)] border-solid border">
    <div class="h-[112px] bg-[rgb(45,_194,_117)] relative">
      <div class="absolute bottom-0 left-[10%] h-[64px] w-[85%] text-3xl font-bold text-white flex items-center">
        Login
      </div>
    </div>
    <div class="flex flex-col gap-4 px-5 pb-5">
      <a-form ref="formRef" :rules="rules" :model="form">
        <a-form-item name="username">
          <a-input v-model:value="form.username" size="large" placeholder="Please input your username" />
        </a-form-item>
        <a-form-item name="password">
          <a-input-password v-model:value="form.password" size="large" placeholder="Please input your password" />
        </a-form-item>
        <a-form-item class="mt-1">
          <a-button :disabled="isFormInvalid" type="primary" size="large" block @click="onLogin">
            Continue
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import adminAPI from '@api/admin'
import { notification } from 'ant-design-vue'
import { reactive, ref, watch } from 'vue'

const formRef = ref<FormInstance>()
const isFormInvalid = ref(true)
const form = reactive({
  username: '',
  password: '',
})

watch(form, async () => {
  try {
    await formRef.value?.validate()
    isFormInvalid.value = false
  } catch (_) {
    isFormInvalid.value = true
  }
})

const rules: Record<string, Rule[]> = {
  username: [{ required: true, message: 'Please input your username!', trigger: ['blur', 'change'] }],
  password: [{ required: true, message: 'Please input your password!', trigger: ['blur', 'change'] }],
}

async function onLogin() {
  try {
    const res = await adminAPI.login(form)
    console.log(res)
  } catch (_) {
    notification.error({
      duration: 2,
      message: 'Login fail',
    })
  }
}
</script>

<style scoped lang="scss">

</style>
