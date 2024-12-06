<template>
  <div class="w-full p-4 bg-white rounded-lg flex justify-center">
    <a-form class="w-[600px]" layout="vertical">
      <a-form-item
        label="Film"
        required
      >
        <a-input v-model:value="formSchedule.film" placeholder="Please input title film" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import cinemaApi from '@/api/cinema'
import filmApi from '@/api/film'
import { onBeforeMount, ref } from 'vue'

const formSchedule = ref({
  film: undefined,
  room: undefined,
  time: undefined,
})

const films = ref<any[]>([])
const cinemas = ref<any[]>([])
async function getFilms() {
  try {
    const res = await filmApi.getAll<any[]>()
    films.value = res.data
  } catch (error) {
  }
}

async function getCinemas() {
  try {
    const res = await cinemaApi.getAll<any[]>()
    cinemas.value = res.data
  } catch (error) {
  }
}

onBeforeMount(async () => {
  await getFilms()
  await getCinemas()
})
</script>

<style lang="">

</style>
