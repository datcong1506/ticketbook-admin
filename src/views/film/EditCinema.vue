<template>
  <div class="w-full p-4 bg-white rounded-lg flex justify-center">
    <a-form class="w-[600px]" layout="vertical" :model="formCinema">
      <a-form-item name="name" label="Name Cinema" required>
        <a-input v-model:value="formCinema.name" placeholder="Please input name cinema" />
      </a-form-item>
      <a-form-item name="location" label="Location" required>
        <a-input v-model:value="formCinema.location" placeholder="Please input location cinema" />
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

      <a-button class="mt-5 w-[100px]" type="primary" @click="updateCinema()">
        Update
      </a-button>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import cinemaApi from '@/api/cinema'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const formCinema = ref({ name: '', location: '', logo: '', description: '' })

async function getCinema() {
  try {
    const res = await cinemaApi.getOne<any>(route.params.id as string)
    formCinema.value = res.data[0]
  } catch (_) {
  }
}

async function updateCinema() {
  try {
    await cinemaApi.updateOne<any>(route.params.id as string, formCinema.value)

    router.push('/cinema')
  } catch (_) {
  }
}

onBeforeMount(async () => {
  await getCinema()
})
</script>

<style lang="scss">
</style>
