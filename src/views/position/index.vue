<template>
  <div class="w-full p-4 bg-white rounded-lg">
    <div class="flex justify-end mb-4">
      <a-button type="primary" @click="openCreateCinema = true">
        Create cinema
      </a-button>
    </div>
    <a-table bordered />
  </div>
  <ModalCreateCinema v-model="openCreateCinema" />
</template>

<script lang="ts" setup>
import cinemaApi from '@/api/cinema'
import ModalCreateCinema from '@/components/position/ModalCreateCinema.vue'
import { onBeforeMount, ref } from 'vue'

const data = ref<any[]>([])
const openCreateCinema = ref(false)

async function fetchData() {
  try {
    const res = await cinemaApi.getAll<any[]>()
    data.value = res.data
  } catch (error) {
  }
}

onBeforeMount(async () => {
  await fetchData()
})
</script>

<style>

</style>
