<template>
  <a-modal v-model:open="modelValue" destroy-on-close title="Create Cinema" @cancel="onCloseModal">
    <div class="w-full pb-6 pt-4">
      <a-form ref="formRef" layout="vertical" :rules="rules" :model="formCinema">
        <a-form-item name="name" label="Name Cinema" required>
          <a-input v-model:value="formCinema.name" placeholder="Please input name cinema" />
        </a-form-item>
        <a-form-item name="location" label="Location" required>
          <a-select
            v-model:value="formCinema.location"
            placeholder="Select location cinema"
            allow-clear
          >
            <template v-for="c of locationList" :key="c">
              <a-select-option :value="c">
                {{ c }}
              </a-select-option>
            </template>
          </a-select>
        </a-form-item>
        <div class="w-full flex gap-3">
          <a-form-item name="logo" label="Logo" required class="logo-field">
            <div class="w-[100px] h-[100px]">
              <FileInput v-model:file="formCinema.logo" />
            </div>
          </a-form-item>
          <a-form-item name="description" label="Description" required class="flex-grow">
            <a-textarea v-model:value="formCinema.description" placeholder="Please input description cinema" :rows="4" />
          </a-form-item>
        </div>
      </a-form>
    </div>
    <template #footer>
      <div class="flex justify-center items-center">
        <a-button type="primary" @click="onCreateClick()">
          OK
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import cinemaApi from '@/api/cinema'
import { ref, watch } from 'vue'
import FileInput from '../common/FileInput.vue'

const emit = defineEmits<{
  createSuccess: []
}>()
const locationList = ['Hà Nội', 'TP. HCM']
const modelValue = defineModel<boolean>()
const initState = {
  name: '',
  location: '',
  logo: '',
  description: '',
}
const formCinema = ref({ ...initState })
const formRef = ref<FormInstance>()

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Please input name cinema!', trigger: ['blur', 'change'] }],
  location: [{ required: true, message: 'Please input location cinema!', trigger: ['blur', 'change'] }],
  logo: [{ required: true, message: 'Please select logo cinema!', trigger: ['blur', 'change'] }],
  description: [{ required: true, message: 'Please input description cinema!', trigger: ['blur', 'change'] }],
}

watch(() => formCinema.value.logo, async () => {
  try {
    await formRef.value?.validate(['logo'])
  } catch (_) {
  }
})
function onCloseModal() {
  formCinema.value = { ...initState }
}
async function onCreateClick() {
  try {
    await formRef.value?.validate()
    await cinemaApi.create(formCinema.value)
    onCloseModal()
    modelValue.value = false
    emit('createSuccess')
  } catch (_) {
  }
}
</script>

<style scoped>
.logo-field {
  max-width: 100px;
}
</style>
